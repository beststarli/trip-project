import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { AtTabBar } from 'taro-ui'
import SwiperContainer from './swiperContainer'
import SearchArea from './searchArea'

export default function FunctionPage() {
    return (
        <View className='w-full min-h-screen bg-gray-100'>
            <SwiperContainer />
            <SearchArea />
        </View>
    )
}
