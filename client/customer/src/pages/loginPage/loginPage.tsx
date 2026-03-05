import { Text, View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import LoginCard from './loginCard/loginCard'
import './loginPage.css'
import RegisterCard from './registerCard/registerCard'

interface LoginPageProps {
    onLoginSuccess: () => void
    onBackToUserPage: () => void
}

export default function LoginPage({
    onLoginSuccess,
    onBackToUserPage
}: LoginPageProps) {
    const [device, setDevice] = useState<'PC' | '移动'>('PC')
    const [authView, setAuthView] = useState<'login' | 'register'>('login')

    useLoad(() => {
        const env = Taro.getEnv()
        setDevice(env === Taro.ENV_TYPE.WEAPP ? '移动' : 'PC')
    })

    return (
        <View className='login-page'>
            <View className='title-card'>
                <View className='w-full flex flex-row items-start justify-end'>
                    <View className='gap-2 flex flex-col items-end'>
                        <Text className='welcome-title-1'>您好，</Text>
                        <Text className='welcome-title-2'>欢迎预订酒店！</Text>
                    </View>
                    <View
                        className='login-back-btn'
                        onClick={onBackToUserPage}
                    >
                        <Text className='login-back-icon'>←</Text>
                    </View>
                    {/* <Text className='absolute top-1 left-1 text-white text-xl mt-1' onClick={onBackToUserPage}>返回</Text> */}
                </View>
            </View>
            <View className='login-card'>
                {authView === 'login' ? (
                    <LoginCard
                        device={device}
                        handleClickRegister={() => setAuthView('register')}
                        onLoginSuccess={onLoginSuccess}
                    />
                ) : (
                    <RegisterCard
                        handleBackToLogin={() => setAuthView('login')}
                    />
                )}
            </View>
        </View>
    )
}
