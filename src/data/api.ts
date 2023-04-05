import { UserCredentials } from "./user";
import type {TripPlanFields} from "../components/TripPlanForm";

const API_URL = 'https://api.simplyluke.com'

export async function authenticateUser(credentials: UserCredentials) {
    const response = await fetch(`${API_URL}/api/authorize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        },
    })

    if (response.status === 200) {
        return true
    } else {
        return false
    }
}


export async function sendEmail(tripPlanFields: TripPlanFields, credentials: UserCredentials) {
    const json = JSON.stringify({...tripPlanFields, prepared_night: Boolean(tripPlanFields.prepared_night)})
    const response = await fetch(`${API_URL}/api/emergency_plan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        },
        body: json 
    })

    if (response.status === 200 || response.status === 202) {
        return true
    } else {
        return false
    }
}