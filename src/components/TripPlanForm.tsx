import type { Component } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createSignal, Show } from 'solid-js'
import { sendEmail } from '../data/api'
import { getUserCredentials } from '../data/user'
import styles from './Forms.module.css';

export type TripPlanFields = {
    destination?: string
    group_members?: string
    emergency_contact?: string
    trailhead?: string
    car?: string
    clothing?: string
    equipment?: string
    prepared_night?: boolean
    expected_return?: string
    emergency_time?: string
    recipient_email?: string
}

export const TripPlanForm: Component = () => {
    const [form, setForm] = createStore<TripPlanFields>({
        destination: '',
        group_members: '',
        emergency_contact: '',
        trailhead: '',
        car: '',
        clothing: '',
        equipment: '',
        prepared_night: false,
        expected_return: '',
        emergency_time: '',
        recipient_email: ''
    })
    
    const [successfulSubmission, setSuccessfulSubmission] = createSignal(false)

    const handleFieldChange = (field: keyof TripPlanFields) => (e: Event) => {
        setForm({[field]: (e.target as HTMLInputElement).value})
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const credentials = getUserCredentials()
        if (credentials === null) {
            return
        }
        const success = await sendEmail(form, credentials) 
        if (success) {
            // animate in a success message
            setSuccessfulSubmission(true)
        }
    }

    return (
        <Show when={successfulSubmission()} fallback={
            <div class="email-form">
                <form onSubmit={handleSubmit}>
                    <div class={styles.formGroup}>
                        <label for="destination">Destination</label>
                        <input type="text" name="destination" id="destination" value={form.destination} onChange={handleFieldChange("destination")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="groupMembers">Group Members</label>
                        <input type="text" name="groupMembers" id="groupMembers" value={form.group_members} onChange={handleFieldChange("group_members")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="emergencyContact">Emergency Contact</label>
                        <input type="text" name="emergencyContact" id="emergencyContact" value={form.emergency_contact} onChange={handleFieldChange("emergency_contact")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="trailhead">Trailhead</label>
                        <input type="text" name="trailhead" id="trailhead" value={form.trailhead} onChange={handleFieldChange("trailhead")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="car">Car</label>
                        <input type="text" name="car" id="car" value={form.car} onChange={handleFieldChange("car")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="clothing">Clothing</label>
                        <input type="text" name="clothing" id="clothing" value={form.clothing} onChange={handleFieldChange("clothing")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="equipment">Equipment</label>
                        <input type="text" name="equipment" id="equipment" value={form.equipment} onChange={handleFieldChange("equipment")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="preparedNight" class={styles.checkboxGroup}>
                            <input type="checkbox" class={styles.checkbox} name="preparedNight" id="preparedNight" value={form.prepared_night?.toString() ?? ''} onChange={handleFieldChange("prepared_night")} />
                            Prepared for night out?
                        </label>
                    </div>
                    <div class={styles.formGroup}>
                        <label for="expectedReturn">Expected Return Time</label>
                        <input type="time" name="expectedReturn" id="expectedReturn" value={form.expected_return} onChange={handleFieldChange("expected_return")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="emergencyTime">Emergency Time</label>
                        <input type="time" name="emergencyTime" id="emergencyTime" value={form.emergency_time} onChange={handleFieldChange("emergency_time")} />
                    </div>
                    <div class={styles.formGroup}>
                        <label for="recipientEmail">Recipient Email</label>
                        <input type="text" name="recipientEmail" id="recipientEmail" value={form.recipient_email} onChange={handleFieldChange("recipient_email")} />
                    </div>
                    <input class={styles.formSubmit} type="submit" value="Share plan" />
                </form>
            </div>

        }>
            <div>
                <h2>Plan shared successfully</h2>
            </div>
        </Show>
    )
}