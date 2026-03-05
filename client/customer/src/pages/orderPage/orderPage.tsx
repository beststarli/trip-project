import { View } from '@tarojs/components'

interface OrderPageProps {
    isLoggedIn: boolean
}

export default function OrderPage({ isLoggedIn }: OrderPageProps) {
    return (
        <View className='w-full min-h-screen bg-gray-100 flex items-center justify-center'>
            {isLoggedIn ? <View>OrderPage</View> : <View className='text-gray-500 text-base'>当前未登录，请先登录</View>}
        </View>
    )
}
