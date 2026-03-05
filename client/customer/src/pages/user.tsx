import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import FunctionPage from './functionPage/functionPage'
import OrderPage from './orderPage/orderPage'
import UserPage from './userPage/userPage'
import CartPage from './cartPage/cartPage'

interface UserProps {
    isLoggedIn: boolean
    currentTab: number
    onTabChange: (value: number) => void
    onRequireLogin: () => void
}

export default function User({
    isLoggedIn,
    currentTab,
    onTabChange,
    onRequireLogin
}: UserProps) {
    const renderPage = () => {
        switch (currentTab) {
            case 0:
                return <FunctionPage isLoggedIn={isLoggedIn} />
            case 1:
                return <CartPage isLoggedIn={isLoggedIn} />
            case 2:
                return <OrderPage isLoggedIn={isLoggedIn} />
            case 3:
                return <UserPage isLoggedIn={isLoggedIn} onRequireLogin={onRequireLogin} />
            default:
                return <FunctionPage isLoggedIn={isLoggedIn} />
        }
    }

    return (
        <View className='w-full min-h-screen bg-gray-100'>
            {renderPage()}
            <AtTabBar
                fixed
                tabList={[
                    { title: '推荐', iconType: 'home' },
                    { title: '购物车', iconType: 'shopping-cart' },
                    { title: '订单', iconType: 'shopping-bag' },
                    { title: '我的', iconType: 'user' },
                ]}
                onClick={onTabChange}
                current={currentTab}
            />
        </View>
    )
}
