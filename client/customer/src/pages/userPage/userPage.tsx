import { View } from '@tarojs/components'
import OrderCard from './orderCard'
import UserCard from './userCard'

interface UserPageProps {
    isLoggedIn: boolean
    onRequireLogin: () => void
}

export default function UserPage({ isLoggedIn, onRequireLogin }: UserPageProps) {
    return (
        <View className='w-full min-h-screen bg-gray-100'>
            <UserCard isLoggedIn={isLoggedIn} onRequireLogin={onRequireLogin} />
            <OrderCard />
        </View>
    )
}
