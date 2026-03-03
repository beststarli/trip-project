import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'
import User from '../user/user'
import Admin from '../admin/admin'

export default function Index() {
	useLoad(() => {
		console.log('Page loaded.')
	})

	return (
		<View className='w-screen h-screen p-0 flex flex-col '>
			{/* <SwiperContainer />
			<SearchArea /> */}
			<User />
			{/* <Admin /> */}
		</View>
	)
}
