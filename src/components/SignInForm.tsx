import type { Component } from 'solid-js'
import { createStore } from 'solid-js/store'
import { authenticateUser } from '../data/api'
import { saveUserCredentials } from '../data/user'
import styles from './Forms.module.css';

type SignInFields = {
    username?: string
    password?: string
}

type SignInFormProps = {
    onSignIn: boolean
}

export const SignInForm: Component<SignInFormProps> = (props) => {
    const [form, setForm] = createStore<SignInFields>({
        username: '',
        password: ''
    })

    const handleFieldChange = (field: keyof SignInFields) => (e: Event) => {
        setForm({[field]: (e.target as HTMLInputElement).value})
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        if (!form.username || !form.password) return
        const credentials = {username: form.username, password: form.password}
        const validLogin = await authenticateUser(credentials)
        if (validLogin) {
            saveUserCredentials(credentials)
            props.onSignIn
        } else {
            setForm({username: '', password: ''})
            // todo animate failure
        }
    }


    return (
        <div class={styles.signInForm}>
            <div class={styles.welcome}>
                <h1>Welcome back</h1>
                <span>Sign in to leave a plan.</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div class={styles.formGroup}>
                    <input type="text" class={styles.signInInput} name="username" id="username" placeholder="Enter username" value={form.username} onChange={handleFieldChange("username")}/>
                </div>
                <div class={styles.formGroup}>
                    <input type="password" class={styles.signInInput} name="password" id="password" placeholder="Enter password" value={form.password} onChange={handleFieldChange("password")}/>
                </div>
                <input class={styles.formSubmit} type="submit" value="Sign In"/>
            </form>
        </div>
    )

}