export type UserCredentials = {
    username: string;
    password: string;
}

// save user credentials to local storage
export function saveUserCredentials(credentials: UserCredentials) {
    localStorage.setItem('username', credentials.username)
    localStorage.setItem('password', credentials.password)
}

export function getUserCredentials(): UserCredentials | null {
    const localStorageUsername = localStorage.getItem('username')
    const localStoragePassword = localStorage.getItem('password')

    if (localStorageUsername === null || localStoragePassword === null) {
        return null
    }

    return {
        username: localStorageUsername, 
        password: localStoragePassword
    }
}

export function clearUserCredentials() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
}