import { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import FunctionPage from './functionPage/functionPage'
import OrderPage from './orderPage/orderPage'
import UserPage from './userPage/userPage'
import CartPage from './cartPage/cartPage'

export default function User() {
    const [current, setCurrent] = useState(0)

    const renderPage = () => {
        switch (current) {
            case 0:
                return <FunctionPage />
            case 1:
                return <CartPage />
            case 2:
                return <OrderPage />
            case 3:
                return <UserPage />
            default:
                return <FunctionPage />
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
                onClick={setCurrent}
                current={current}
            />
        </View>
    )
}
