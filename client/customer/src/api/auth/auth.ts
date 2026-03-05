import Taro from '@tarojs/taro'
import { AUTH_URL } from "../url"
import { UserLoginData, UserLoginResponse, UserRegisterData, UserRegisterResponse } from "./types"


export const userRegister = async (data: UserRegisterData): Promise<UserRegisterResponse> => {
    const response = await Taro.request({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        data: {
            account: data.account,
            password: data.password,
            confirmPassword: data.confirmPassword,
        },
        header: {
            'Content-Type': 'application/json',
        },
    })

    return response.data as UserRegisterResponse
}

export const userLogin = async (data: UserLoginData): Promise<UserLoginResponse> => {
    const response = await Taro.request({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        data: {
            account: data.account,
            password: data.password,
        },
        header: {
            'Content-Type': 'application/json',
        },
    })

    return response.data as UserLoginResponse
}