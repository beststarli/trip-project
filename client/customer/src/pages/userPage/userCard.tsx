import { Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

const headerButtonsList = [
    {
        id: 1,
        text: '帮助',
        icon: 'help',
    },
    {
        id: 2,
        text: '消息',
        icon: 'message',
    },
    {
        id: 3,
        text: '设置',
        icon: 'settings',
    },
]

interface UserCardProps {
    isLoggedIn: boolean
    onRequireLogin: () => void
}

export default function UserCard({ 
    isLoggedIn, 
    onRequireLogin 
}: UserCardProps) {
    return (
        <View className='w-full h-44 box-border bg-amber-100 items-center z-10 p-2'>
            <View className='w-full box-border'>
                {/* 设置按钮 */}
                <View className='w-full box-border flex justify-end px-2 pb-1 gap-4 shadow-md'>
                    {headerButtonsList.map(button => {
                        return (
                            <View key={button.id} className='flex flex-col items-center'>
                                <AtIcon value={button.icon} size='20' color='#000000'></AtIcon>
                                <Text className='buttonText'>{button.text}</Text>
                            </View>
                        )
                    })}
                </View>

                {/* 头像信息 */}
                {/* TODO：从数据库获取用户信息 */}
                <View
                    className='flex p-2 gap-4 items-center bg-lime-300'
                    onClick={() => {
                        if (!isLoggedIn) {
                            onRequireLogin()
                        }
                    }}
                >
                    <View>
                        {isLoggedIn ? (
                            <View className='w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center'>
                                <Text className='text-white text-lg'>测</Text>
                            </View>
                        ) : (
                            <View className='w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center'>
                                <Text className='text-white text-lg'>未</Text>
                            </View>
                        )}
                    </View>
                    <View>
                        <View>
                            <Text className='text-lg font-bold'>{isLoggedIn ? '测试用户' : '当前未登录'}</Text>
                        </View>
                        <View>
                            <Text className='text-xs text-gray-600'>{isLoggedIn ? '测试用户的简介信息' : '请先登录以使用全部功能'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}
