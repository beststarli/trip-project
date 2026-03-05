import { Text, View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import LoginCard from './loginCard/loginCard'
import './loginPage.css'
import RegisterCard from './registerCard/registerCard'

export default function LoginPage() {
    const [device, setDevice] = useState<'PC' | '移动'>('PC')
    const [authView, setAuthView] = useState<'login' | 'register'>('login')

    // 消费者端：登录/注册表单（预留 value 与 onChange）
    const [customerLoginAccount, setCustomerLoginAccount] = useState('')
    const [customerLoginPassword, setCustomerLoginPassword] = useState('')

    const handleCustomerLoginAccountChange = (value: string) => {
        setCustomerLoginAccount(String(value ?? ''))
        return value
    }

    const handleCustomerLoginPasswordChange = (value: string) => {
        setCustomerLoginPassword(String(value ?? ''))
        return value
    }

    useLoad(() => {
        const env = Taro.getEnv()
        setDevice(env === Taro.ENV_TYPE.WEAPP ? '移动' : 'PC')
    })

    const handleLogin = () => {
        // TODO: 接入真实登录逻辑
    }

    const handleRegister = () => {
        setAuthView('register')
    }

    const handleBackToLogin = () => {
        setAuthView('login')
    }

    return (
        <View className='login-page'>
            <View className='title-card'>
                <View className='gap-2 flex flex-col items-start'>
                    <Text className='welcome-title'>您好，</Text>
                    <Text className='welcome-title'>欢迎预订酒店！</Text>
                </View>
            </View>
            <View className='login-card'>
                {authView === 'login' ? (
                    <LoginCard
                        device={device}
                        customerLoginAccount={customerLoginAccount}
                        customerLoginPassword={customerLoginPassword}
                        handleCustomerLoginAccountChange={handleCustomerLoginAccountChange}
                        handleCustomerLoginPasswordChange={handleCustomerLoginPasswordChange}
                        handleLogin={handleLogin}
                        handleRegister={handleRegister}
                    />
                ) : (
                    <RegisterCard
                        handleBackToLogin={handleBackToLogin}
                    />
                )}
            </View>
        </View>
    )
}
