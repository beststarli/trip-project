import { Input, Text, View } from '@tarojs/components'
import { AtButton, AtNoticebar } from 'taro-ui'
import './loginCard.css'

interface LoginCardProps {
    device: 'PC' | '移动'
    customerLoginAccount: string
    customerLoginPassword: string
    handleCustomerLoginAccountChange: (value: string) => string
    handleCustomerLoginPasswordChange: (value: string) => string
    handleLogin: () => void
    handleRegister: () => void
}

export default function LoginCard({
    device,
    customerLoginAccount,
    customerLoginPassword,
    handleCustomerLoginAccountChange,
    handleCustomerLoginPasswordChange,
    handleLogin,
    handleRegister,
}: LoginCardProps) {
    return (
        <>
            <View className='w-full flex flex-col items-start gap-2 mt-3'>
                <View >
                    <Text className='block text-2xl font-bold text-sky-500'>用户登录</Text>
                    <View className='w-24 flex justify-center'>
                        <View className='h-1 w-12 bg-sky-600 shadow-xl rounded-full'></View>
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
                        <Text className='block text-xl font-semibold'>手机号</Text>
                        <View className='login-input-row'>
                            <Input
                                className='field-input'
                                type='text'
                                placeholder='请输入您的手机号'
                                placeholderClass='input-placeholder'
                                value={customerLoginAccount}
                                onInput={(event) => handleCustomerLoginAccountChange((event?.detail?.value ?? '') as string)}
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
                                value={customerLoginPassword}
                                onInput={(event) => handleCustomerLoginPasswordChange((event?.detail?.value ?? '') as string)}
                            />
                            <Text className='password-icon'>◉</Text>
                        </View>
                    </View>
                </View>
                <Text className='forget-text'>忘记密码？</Text>

                <View className='gap-5 mt-4 flex flex-col'>
                    <AtButton className='primary-btn' onClick={handleLogin}>
                        登录
                    </AtButton>
                    <AtButton className='secondary-btn' onClick={handleRegister}>
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
