import { Input, Text, View } from '@tarojs/components'
import { AtButton, AtNoticebar } from 'taro-ui'
import { useState } from 'react'
import './loginCard.css'
import { UserLoginData } from '@/api/auth/types'
import { userLogin } from '@/api/auth/auth'
import Taro from '@tarojs/taro'

interface LoginCardProps {
    device: 'PC' | '移动'
    handleClickRegister: () => void
    onLoginSuccess: () => void
}

export default function LoginCard({
    device,
    handleClickRegister,
    onLoginSuccess,
}: LoginCardProps) {
    const [customerLoginAccount, setCustomerLoginAccount] = useState('')
    const [customerLoginPassword, setCustomerLoginPassword] = useState('')
    const [customerLoginAccountError, setCustomerLoginAccountError] = useState('')
    const [customerLoginPasswordError, setCustomerLoginPasswordError] = useState('')

    const clearAllErrors = () => {
        setCustomerLoginAccountError('')
        setCustomerLoginPasswordError('')
    }

    const setSingleError = (field: 'account' | 'password', message: string) => {
        clearAllErrors()
        if (field === 'account') {
            setCustomerLoginAccountError(message)
            return
        }
        setCustomerLoginPasswordError(message)
    }

    const handleLoginButtonClick = async () => {
        if (!customerLoginAccount.trim()) {
            setSingleError('account', '请输入手机号')
            return
        }
        if (customerLoginAccount.trim().length !== 11) {
            setSingleError('account', '输入手机号有误')
            return
        }
        if (!customerLoginPassword.trim()) {
            setSingleError('password', '请输入密码')
            return
        }

        if (customerLoginPassword.length < 8) {
            setSingleError('password', '密码长度至少 8 位')
            return
        }
        clearAllErrors()

        const loginData = {
            account: customerLoginAccount.trim(),
            password: customerLoginPassword.trim(),
        } as UserLoginData

        try {
            clearAllErrors()
            const loginResponse = await userLogin(loginData)
            if (loginResponse.success) {
                Taro.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000,
                })
                setTimeout(() => {
                    onLoginSuccess()
                }, 2000)
            } else {
                const errorMessage = loginResponse.message || '登录失败'
                if (errorMessage.includes('不存在')) {
                    setSingleError('account', '该账号不存在，请先注册')
                } else {
                    setSingleError('account', errorMessage)
                }
            }
        } catch (error) {
            console.error('登录请求失败:', error)
            setSingleError('account', '登录请求失败，请稍后再试')
        }
    }

    return (
        <>
            <View className='w-full flex flex-col items-start gap-2 mt-3'>
                <View >
                    <Text className='login-title-text'>用户登录</Text>
                    <View className='w-24 flex justify-center'>
                        <View className='h-1 w-10 bg-sky-500 shadow-xl rounded-full'></View>
                    </View>
                </View>
                <AtNoticebar
                    marquee
                    single
                    icon='volume-plus'
                    className='notice-bar'
                >
                    {device === 'PC' ? '当前设备：PC端，建议使用微信扫码登录' : '当前设备为移动端，请使用消费者账号登录'}
                </AtNoticebar>
            </View>
            <View className='pt-2'>
                <View className='flex flex-col gap-6'>
                    <View>
                        <View className='input-label-row'>
                            <Text className='text-xl font-semibold'>手机号</Text>
                            {customerLoginAccountError ? <Text className='input-error-text-inline'>{customerLoginAccountError}</Text> : null}
                        </View>
                        <View className={`login-input-row ${customerLoginAccountError ? 'input-row-error' : ''}`}>
                            <Input
                                className='field-input'
                                type='text'
                                placeholder='请输入您的手机号'
                                placeholderClass='input-placeholder'
                                value={customerLoginAccount}
                                onInput={(event) => {
                                    const value = (event?.detail?.value ?? '') as string
                                    setCustomerLoginAccount(value)
                                    if (value.trim()) {
                                        setCustomerLoginAccountError('')
                                    }
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View className='input-label-row'>
                            <Text className='text-xl font-semibold'>密码</Text>
                            {customerLoginPasswordError ? <Text className='input-error-text-inline'>{customerLoginPasswordError}</Text> : null}
                        </View>
                        <View className={`login-input-row password-row ${customerLoginPasswordError ? 'input-row-error' : ''}`}>
                            <Input
                                className='field-input'
                                type='text'
                                password
                                placeholder='请输入您的密码'
                                placeholderClass='input-placeholder'
                                value={customerLoginPassword}
                                onInput={(event) => {
                                    const value = (event?.detail?.value ?? '') as string
                                    setCustomerLoginPassword(value)
                                    if (value.trim()) {
                                        setCustomerLoginPasswordError('')
                                    }
                                }}
                            />
                            <Text className='password-icon'>◉</Text>
                        </View>
                    </View>
                </View>
                <Text className='forget-text'>忘记密码？</Text>

                <View className='gap-5 mt-4 flex flex-col'>
                    <AtButton className='primary-btn' onClick={handleLoginButtonClick}>
                        登录
                    </AtButton>
                    <AtButton className='secondary-btn' onClick={handleClickRegister}>
                        注册
                    </AtButton>

                    <View className='third-login-title'>
                        <View className='line' />
                        <Text className='line-text'>第三方登录</Text>
                        <View className='line' />
                    </View>

                    <View className='third-login-icons'>
                        <View className='icon-item wechat'>微</View>
                        <View className='icon-item apple'></View>
                        <View className='icon-item alipay'>支</View>
                    </View>
                </View>
            </View>
        </>
    )
}
