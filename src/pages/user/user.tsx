import { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import FunctionPage from './functionPage'
import OrderPage from './orderPage'
import UserPage from './userPage'

export default function User() {
    const [current, setCurrent] = useState(0)

    const renderPage = () => {
        switch (current) {
            case 0:
                return <FunctionPage />
            case 1:
                return <OrderPage />
            case 2:
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
                    { title: '推荐', iconType: 'arrow-down',  },
                    { title: '订单', iconType: 'shopping-bag-2' },
                    { title: '我', iconType: 'user',}
                ]}
                onClick={setCurrent}
                current={current}
            />
        </View>
    )
}
