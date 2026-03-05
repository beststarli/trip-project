import { View } from '@tarojs/components'
import React from 'react'

interface CartPageProps {
  isLoggedIn: boolean
}

export default function CartPage({ isLoggedIn }: CartPageProps) {
  return (
    <View className='w-full min-h-screen bg-gray-100 flex items-center justify-center'>
      {isLoggedIn ? <View>CartPage</View> : <View className='text-gray-500 text-base'>当前未登录，请先登录</View>}
    </View>
  )
}
