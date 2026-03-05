import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.css'
import LoginPage from '../loginPage/loginPage'
import User from '../user'

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [currentTab, setCurrentTab] = useState(0)
	const [currentView, setCurrentView] = useState<'user' | 'login'>('user')

	useLoad(() => {
		console.log('Page loaded.')
	})

	const handleRequireLogin = () => {
		setCurrentView('login')
	}

	const handleBackFromLogin = () => {
		setCurrentView('user')
		setCurrentTab(3)
	}

	const handleLoginSuccess = () => {
		setIsLoggedIn(true)
		setCurrentView('user')
		setCurrentTab(3)
	}

	return (
		<View className='w-screen h-screen p-0 flex flex-col '>
			{currentView === 'login' ? (
				<LoginPage onLoginSuccess={handleLoginSuccess} onBackToUserPage={handleBackFromLogin} />
			) : (
				<User
					isLoggedIn={isLoggedIn}
					currentTab={currentTab}
					onTabChange={setCurrentTab}
					onRequireLogin={handleRequireLogin}
				/>
			)}
		</View>
	)
}
