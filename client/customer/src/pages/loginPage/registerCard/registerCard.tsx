import { useState } from 'react'
import { AtButton } from 'taro-ui'
import { Input, Text, View } from '@tarojs/components'
import './registerCard.css'

interface RegisterCardProps {
    handleBackToLogin: () => void
}

export default function RegisterCard({
    handleBackToLogin,
}: RegisterCardProps) {
    const [customerRegisterAccount, setCustomerRegisterAccount] = useState('')
    const [customerRegisterPassword, setCustomerRegisterPassword] = useState('')
    const [customerRegisterConfirmPassword, setCustomerRegisterConfirmPassword] = useState('')

    const handleRegisterClick = () => {

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
                            <Text className='block text-2xl font-bold text-sky-500'>用户注册</Text>
                            <View className='w-24 flex justify-center'>
                                <View className='h-1 w-12 bg-sky-600 shadow-xl rounded-full'></View>
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
                        <Text className='block text-xl font-semibold'>手机号</Text>
                        <View className='login-input-row'>
                            <Input
                                className='field-input'
                                type='text'
                                placeholder='请输入您的手机号'
                                placeholderClass='input-placeholder'
                                value={customerRegisterAccount}
                                onInput={(event) => setCustomerRegisterAccount((event?.detail?.value ?? '') as string)}
                            />
                        </View>
                    </View>
                    <View>
                        <Text className='block text-xl font-semibold'>密码</Text>
                        <View className='login-input-row password-row'>
                            <Input
                                className='field-input'
                                type='text'
                                password
                                placeholder='请输入您的密码'
                                placeholderClass='input-placeholder'
                                value={customerRegisterPassword}
                                onInput={(event) => setCustomerRegisterPassword((event?.detail?.value ?? '') as string)}
                            />
                            <Text className='password-icon'>◉</Text>
                        </View>
                    </View>
                    <View>
                        <Text className='block text-xl font-semibold'>确认密码</Text>
                        <View className='login-input-row password-row'>
                            <Input
                                className='field-input'
                                type='text'
                                password
                                placeholder='请再次输入您的密码'
                                placeholderClass='input-placeholder'
                                value={customerRegisterConfirmPassword}
                                onInput={(event) => setCustomerRegisterConfirmPassword((event?.detail?.value ?? '') as string)}
                            />
                            <Text className='password-icon'>◉</Text>
                        </View>
                    </View>
                </View>

                <AtButton className='register-btn' onClick={handleRegisterClick}>
                    注册
                </AtButton>

                <View className='policy-title'>
                    <Text className='line-text'>登录即接受</Text>
                    <Text className='line-text-policy' onClick={handleClickUserPolicy}>用户协议</Text>
                    <Text className='line-text'>及</Text>
                    <Text className='line-text-policy' onClick={handleClickPrivatePolicy}>隐私政策</Text>
                </View>
            </View>
        </>
    )
}
