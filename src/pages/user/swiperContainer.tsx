import { useLoad } from '@tarojs/taro'
import { Image, View, Swiper, SwiperItem } from '@tarojs/components'
import { hotelSwiperData, HotelSwiperItem } from '../../utils/data'

export default function SwiperContainer() {
    useLoad(() => {
        console.log('Header Swiper loaded.')
    })

    const handleClickSwiperImage = (item: HotelSwiperItem) => {
        console.log('Clicked swiper image:', item.name)
    }

    return (
        <View className='w-full bg-red-200 box-border items-center z-10'>
            {/* <View className='w-full relative z-0 overflow-hidden'></View> */}
            <Swiper
                className='w-full h-44 box-border'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay
            >
                {hotelSwiperData.map(item => {
                    return (
                        <SwiperItem key={item.id}>
                            <Image
                                src={item.image}
                                mode='aspectFill'
                                className='w-full h-full'
                                lazyLoad
                                onClick={() => handleClickSwiperImage(item)}
                            />
                        </SwiperItem>
                    )
                })
                }
                {/* <SwiperItem>
                    <View className='bg-green-300'>酒店1</View>
                </SwiperItem>
                <SwiperItem>
                    <View className='bg-purple-300'>酒店2</View>
                </SwiperItem>
                <SwiperItem>
                    <View className='bg-blue-300'>酒店3</View>
                </SwiperItem> */}
            </Swiper>

            {/* <View className='pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gray-100 bg-gradient-to-b from-transparent to-gray-100' /> */}
        </View>
    )
}
