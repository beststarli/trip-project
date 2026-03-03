import { View } from '@tarojs/components'
import OrderCard from './orderCard'
import UserCard from './userCard'

export default function UserPage() {
    return (
        <View className='w-full min-h-screen bg-gray-100'>
            <UserCard />
            <OrderCard />
        </View>
    )
}
