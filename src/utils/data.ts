import hotel1 from '../../static/hotel1.png'
import hotel2 from '../../static/hotel2.png'
import hotel3 from '../../static/hotel3.png'

export interface HotelSwiperItem {
    id: number
    name: string
    image: string
}

export const hotelSwiperData: HotelSwiperItem[] = [
    {
        id: 1,
        name: '酒店1',
        image: hotel1,
    },
    {
        id: 2,
        name: '酒店2',
        image: hotel2,
    },
    {
        id: 3,
        name: '酒店3',
        image: hotel3,
    },
]