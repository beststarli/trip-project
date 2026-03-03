import { Input, Text, View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { AtButton, AtCheckbox, AtNoticebar, AtTabs, AtTabsPane } from 'taro-ui'
import './loginPage.css'

const customerTabList = [
    {
        title: '登录'
    },
    {
        title: '注册'
    },
]

export default function LoginPage() {
    const [device, setDevice] = useState<'PC' | '移动'>('PC')
    const [rememberMe, setRememberMe] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    // 消费者端：登录/注册表单（预留 value 与 onChange）
    const [customerLoginAccount, setCustomerLoginAccount] = useState('')
    const [customerLoginPassword, setCustomerLoginPassword] = useState('')
    const [customerRegisterAccount, setCustomerRegisterAccount] = useState('')
    const [customerRegisterPassword, setCustomerRegisterPassword] = useState('')
    const [customerConfirmPassword, setCustomerConfirmPassword] = useState('')

    const handleCustomerLoginAccountChange = (value: string) => {
        setCustomerLoginAccount(String(value ?? ''))
        return value
    }

    const handleCustomerLoginPasswordChange = (value: string) => {
        setCustomerLoginPassword(String(value ?? ''))
        return value
    }

    const handleCustomerRegisterAccountChange = (value: string) => {
        setCustomerRegisterAccount(String(value ?? ''))
        return value
    }

    const handleCustomerRegisterPasswordChange = (value: string) => {
        setCustomerRegisterPassword(String(value ?? ''))
        return value
    }

    const handleCustomerConfirmPasswordChange = (value: string) => {
        setCustomerConfirmPassword(String(value ?? ''))
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
        // TODO: 接入真实注册逻辑
    }

    return (
        <View className='w-full min-h-screen bg-blue-400 flex flex-col items-center gap-4'>
            <View className='mt-24 mb-4'>
                <Text className='relative text-4xl font-bold text-white'>登 录</Text>
            </View>
            <View className='w-80 bg-white rounded-md shadow-md p-2'>
                <AtNoticebar
                    marquee
                    single
                    icon='volume-plus'
                >
                    {device === 'PC' ? '当前设备：PC端，建议使用微信扫码登录以获得更好体验' : `当前设备为${device}端，请以消费者用户登录/注册。`}
                </AtNoticebar>
                <View>
                    {device === 'PC' ? (
                        <AtButton type='primary' className='w-full mt-4' onClick={handleLogin}>
                            微信扫码登录
                        </AtButton>
                    ) : (
                        <AtTabs current={activeTab} tabList={customerTabList} onClick={setActiveTab}>
                            <AtTabsPane current={activeTab} index={0}>
                                <View className='pt-6 pb-2 text-center'>
                                    <View className='px-2 login-input-group'>
                                        <View className='flex flex-row items-center p-2 login-input-item'>
                                            <Text className='w-16 text-left text-black text-lg'>账号:</Text>
                                            <View className='login-input-row'>
                                                <Input
                                                    className='flex-1 text-left text-black text-base'
                                                    type='text'
                                                    placeholder=' 请输入手机/邮箱'
                                                    placeholderClass='text-gray-300'
                                                    value={customerLoginAccount}
                                                    onInput={(event) => handleCustomerLoginAccountChange((event?.detail?.value ?? '') as string)}
                                                />
                                            </View>
                                        </View>
                                        <View className='flex flex-row items-center p-2 login-input-item'>
                                            <Text className='w-16 text-left text-black text-lg'>密码:</Text>
                                            <View className='login-input-row'>
                                                <Input
                                                    className='flex-1 text-left text-black text-base'
                                                    type='text'
                                                    password
                                                    placeholder=' 请输入密码'
                                                    placeholderClass='text-gray-300'
                                                    value={customerLoginPassword}
                                                    onInput={(event) => handleCustomerLoginPasswordChange((event?.detail?.value ?? '') as string)}
                                                />
                                            </View>

                                        </View>
                                    </View>

                                    <View className='mt-2'>
                                        <AtCheckbox
                                            options={[{ label: '记住我', value: 'rememberMe' }]}
                                            selectedList={rememberMe ? ['rememberMe'] : []}
                                            onChange={(list) => setRememberMe((list as string[]).includes('rememberMe'))}
                                        />
                                    </View>

                                    <View className='mt-3'>
                                        <AtButton type='primary' onClick={handleLogin}>
                                            登录
                                        </AtButton>
                                    </View>
                                </View>
                            </AtTabsPane>
                            <AtTabsPane current={activeTab} index={1}>
                                <View className='py-6 text-center'>
                                    <View className='px-2 login-input-group'>
                                        <View className='flex flex-row items-center p-2 login-input-item'>
                                            <Text className='w-16 text-left text-black text-lg'>账号:</Text>
                                            <View className='login-input-row'>
                                                <Input
                                                    className='flex-1 text-left text-black text-base'
                                                    type='text'
                                                    placeholder='请输入手机/邮箱'
                                                    placeholderClass='text-gray-300'
                                                    value={customerRegisterAccount}
                                                    onInput={(event) => handleCustomerRegisterAccountChange((event?.detail?.value ?? '') as string)}
                                                />
                                            </View>
                                        </View>
                                        <View className='flex flex-row items-center p-2 login-input-item'>
                                            <Text className='w-16 text-left text-black text-lg'>密码:</Text>
                                            <View className='login-input-row'>
                                                <Input
                                                    className='flex-1 text-left text-black text-base'
                                                    type='text'
                                                    password
                                                    placeholder='请输入密码'
                                                    placeholderClass='text-gray-300'
                                                    value={customerRegisterPassword}
                                                    onInput={(event) => handleCustomerRegisterPasswordChange((event?.detail?.value ?? '') as string)}
                                                />
                                            </View>
                                        </View>
                                        <View className='flex flex-row items-center p-2 login-input-item'>
                                            <Text className='w-16 text-left text-black text-lg flex-nowrap'>确认密码:</Text>
                                            <View className='login-input-row'>
                                                <Input
                                                    className='flex-1 text-left text-black text-base'
                                                    type='text'
                                                    password
                                                    placeholder='请再次输入密码'
                                                    placeholderClass='text-gray-300'
                                                    value={customerConfirmPassword}
                                                    onInput={(event) => handleCustomerConfirmPasswordChange((event?.detail?.value ?? '') as string)}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View className='mt-3'>
                                        <AtButton type='primary' onClick={handleRegister}>
                                            注册
                                        </AtButton>
                                    </View>
                                </View>
                            </AtTabsPane>
                        </AtTabs>
                    )}
                </View>
            </View>
        </View>
    )
}
