export interface UserRegisterData {
    account: string
    password: string
    confirmPassword: string
}

export interface UserLoginData {
    account: string
    password: string
}

export interface UserRegisterResponse {
    success?: boolean
    message?: string
    user?: {
        id: number
        account: string
        created_at: string
    }
}

export interface UserLoginResponse {
    success?: boolean
    message?: string
    token?: string
    user?: {
        id: number
        account: string
        created_at: string
    }
}