import { useState } from 'react'
import { AtButton } from 'taro-ui'
import { Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './registerCard.css'
import { userRegister } from '@/api/auth/auth'
import { UserRegisterData } from '@/api/auth/types'

interface RegisterCardProps {
    handleBackToLogin: () => void
}

export default function RegisterCard({
    handleBackToLogin,
}: RegisterCardProps) {
    const [customerRegisterAccount, setCustomerRegisterAccount] = useState('')
    const [customerRegisterPassword, setCustomerRegisterPassword] = useState('')
    const [customerRegisterConfirmPassword, setCustomerRegisterConfirmPassword] = useState('')
    const [customerRegisterAccountError, setCustomerRegisterAccountError] = useState('')
    const [customerRegisterPasswordError, setCustomerRegisterPasswordError] = useState('')
    const [customerRegisterConfirmPasswordError, setCustomerRegisterConfirmPasswordError] = useState('')

    const clearAllErrors = () => {
        setCustomerRegisterAccountError('')
        setCustomerRegisterPasswordError('')
        setCustomerRegisterConfirmPasswordError('')
    }

    const setSingleError = (field: 'account' | 'password' | 'confirmPassword', message: string) => {
        clearAllErrors()

        if (field === 'account') {
            setCustomerRegisterAccountError(message)
            return
        } else if (field === 'password') {
            setCustomerRegisterPasswordError(message)
            return
        } else if (field === 'confirmPassword') {
            setCustomerRegisterConfirmPasswordError(message)
            return
        }
    }

    const handleRegisterClick = async () => {
        if (!customerRegisterAccount.trim()) {
            setSingleError('account', '请输入手机号')
            return
        }

        if (!customerRegisterPassword.trim()) {
            setSingleError('password', '请输入密码')
            return
        }

        if (!customerRegisterConfirmPassword.trim()) {
            setSingleError('confirmPassword', '请再次输入密码')
            return
        }

        if (customerRegisterPassword !== customerRegisterConfirmPassword) {
            clearAllErrors()
            setCustomerRegisterPasswordError('两次输入的密码不一致')
            setCustomerRegisterConfirmPasswordError('两次输入的密码不一致')
            return
        }

        if (customerRegisterAccount.trim().length !== 11) {
            setSingleError('account', '输入手机号有误')
            return
        }

        if (customerRegisterPassword.length < 8) {
            setSingleError('password', '密码长度至少 8 位')
            return
        }

        if (customerRegisterConfirmPassword.length < 8) {
            setSingleError('confirmPassword', '密码长度至少 8 位')
            return
        }

        const registerData = {
            account: customerRegisterAccount.trim(),
            password: customerRegisterPassword.trim(),
            confirmPassword: customerRegisterConfirmPassword.trim(),
        } as UserRegisterData

        try {
            clearAllErrors()
            const registerResponse = await userRegister(registerData)
            if (registerResponse.success) {
                Taro.showToast({
                    title: '注册成功',
                    icon: 'success',
                    duration: 2000,
                })
                setTimeout(() => {
                    handleBackToLogin()
                }, 2000)
            } else {
                const errorMessage = registerResponse.message || '注册失败'
                if (errorMessage.includes('已存在')) {
                    setSingleError('account', '该账号已存在，请使用其他手机号注册')
                } else {
                    setSingleError('account', errorMessage)
                }
            }
        } catch (error) {
            console.error('注册请求失败:', error)
            setSingleError('account', '注册请求失败，请稍后再试')
        }
    }

    const handleClickUserPolicy = () => {

    }

    const handleClickPrivatePolicy = () => {

    }

    return (
        <>
            <View className='pt-2'>
                <View className='flex flex-col gap-6 mt-1'>
                    <View className='flex flex-row items-center justify-between'>
                        <View className=''>
                            <Text className='register-title-text'>用户注册</Text>
                            <View className='w-24 flex justify-center'>
                                <View className='h-1 w-10 bg-sky-500 shadow-xl rounded-full'></View>
                            </View>
                        </View>
                        <View className='flex items-center'>
                            <Text className='login-already-text'>已有账号？</Text>
                            <Text className='login-already-text login-link' onClick={handleBackToLogin}>
                                去登录
                            </Text>
                        </View>
                    </View>
                    <View>
                        <View className='input-label-row'>
                            <Text className='text-xl font-semibold'>手机号</Text>
                            {customerRegisterAccountError ? <Text className='input-error-text-inline'>{customerRegisterAccountError}</Text> : null}
                        </View>
                        <View className={`login-input-row ${customerRegisterAccountError ? 'input-row-error' : ''}`}>
                            <Input
                                className='field-input'
                                type='text'
                                placeholder='请输入您的手机号'
                                placeholderClass='input-placeholder'
                                value={customerRegisterAccount}
                                onInput={(event) => {
                                    const value = (event?.detail?.value ?? '') as string
                                    setCustomerRegisterAccount(value)
                                    if (value.trim()) {
                                        setCustomerRegisterAccountError('')
                                    }
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View className='input-label-row'>
                            <Text className='text-xl font-semibold'>密码</Text>
                            {customerRegisterPasswordError ? <Text className='input-error-text-inline'>{customerRegisterPasswordError}</Text> : null}
                        </View>
                        <View className={`login-input-row password-row ${customerRegisterPasswordError ? 'input-row-error' : ''}`}>
                            <Input
                                className='field-input'
                                type='text'
                                password
                                placeholder='请输入您的密码'
                                placeholderClass='input-placeholder'
                                value={customerRegisterPassword}
                                onInput={(event) => {
                                    const value = (event?.detail?.value ?? '') as string
                                    setCustomerRegisterPassword(value)
                                    if (value.trim()) {
                                        setCustomerRegisterPasswordError('')
                                    }
                                }}
                            />
                            <Text className='password-icon'>◉</Text>
                        </View>
                    </View>
                    <View>
                        <View className='input-label-row'>
                            <Text className='text-xl font-semibold'>确认密码</Text>
                            {customerRegisterConfirmPasswordError ? <Text className='input-error-text-inline'>{customerRegisterConfirmPasswordError}</Text> : null}
                        </View>
                        <View className={`login-input-row password-row ${customerRegisterConfirmPasswordError ? 'input-row-error' : ''}`}>
                            <Input
                                className='field-input'
                                type='text'
                                password
                                placeholder='请再次输入您的密码'
                                placeholderClass='input-placeholder'
                                value={customerRegisterConfirmPassword}
                                onInput={(event) => {
                                    const value = (event?.detail?.value ?? '') as string
                                    setCustomerRegisterConfirmPassword(value)
                                    if (value.trim()) {
                                        setCustomerRegisterConfirmPasswordError('')
                                    }
                                }}
                            />
                            <Text className='password-icon'>◉</Text>
                        </View>
                    </View>
                </View>

                <AtButton className='register-btn' onClick={handleRegisterClick}>
                    注册
                </AtButton>

                <View className='policy-title'>
                    <Text className='register-line-text'>登录即接受</Text>
                    <Text className='line-text-policy' onClick={handleClickUserPolicy}>用户协议</Text>
                    <Text className='register-line-text'>及</Text>
                    <Text className='line-text-policy' onClick={handleClickPrivatePolicy}>隐私政策</Text>
                </View>
            </View>
        </>
    )
}
