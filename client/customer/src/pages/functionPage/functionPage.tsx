import { View } from '@tarojs/components'
import SwiperContainer from './swiperContainer'
import SearchArea from './searchArea'

interface FunctionPageProps {
    isLoggedIn: boolean
}

export default function FunctionPage({ isLoggedIn }: FunctionPageProps) {
    return (
        <View className='w-full min-h-screen bg-gray-100 overflow-y-auto'>
            <SwiperContainer />
            <SearchArea isLoggedIn={isLoggedIn} />
        </View>
    )
}
