import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'
import LoginPage from '../loginPage/loginPage'
import User from '../user'

export default function Index() {
	useLoad(() => {
		console.log('Page loaded.')
	})

	return (
		<View className='w-screen h-screen p-0 flex flex-col '>
			<LoginPage />
			{/* <User /> */}
		</View>
	)
}
