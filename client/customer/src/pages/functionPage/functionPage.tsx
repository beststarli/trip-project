import { View } from '@tarojs/components'
import SwiperContainer from './swiperContainer'
import SearchArea from './searchArea'

export default function FunctionPage() {
    return (
        <View className='w-full min-h-screen bg-gray-100 overflow-y-auto'>
            <SwiperContainer />
            <SearchArea />
        </View>
    )
}
