import Taro from '@tarojs/taro'
import { Input, Picker, ScrollView, Text, View } from '@tarojs/components'
import { useMemo, useState } from 'react'


export default function SearchArea() {
    const tabs = useMemo(() => ['国内', '海外', '民宿·短租', '钟点房'], [])
    const quickTags = useMemo(() => ['浴缸', '免费停车场', '温泉', '双床房', '亚朵'], [])

    const [activeTab, setActiveTab] = useState(0)
    const [locatedText, setLocatedText] = useState('已定位到 南京，南京师范大学(仙林校区) - 北苑附近')
    const [locationLabel, setLocationLabel] = useState('我的位置')
    const [keyword, setKeyword] = useState('')

    const [startDate, setStartDate] = useState('2026-03-04')
    const [endDate, setEndDate] = useState('2026-03-05')

    const guestRoomPresets = useMemo(
        () => ['1间房 1成人 0儿童', '1间房 2成人 0儿童', '2间房 2成人 0儿童', '1间房 2成人 1儿童'],
        []
    )
    const [guestRoomIndex, setGuestRoomIndex] = useState(0)

    const filterPresets = useMemo(() => ['价格/星级', '价格优先', '星级优先', '性价比优先'], [])
    const [filterIndex, setFilterIndex] = useState(0)

    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const nights = useMemo(() => {
        const start = new Date(`${startDate}T00:00:00`)
        const end = new Date(`${endDate}T00:00:00`)
        const diff = end.getTime() - start.getTime()
        const n = Math.round(diff / (24 * 60 * 60 * 1000))
        return Number.isFinite(n) && n > 0 ? n : 1
    }, [startDate, endDate])

    const displayStart = useMemo(() => {
        const d = new Date(`${startDate}T00:00:00`)
        return `${d.getMonth() + 1}月${d.getDate()}日`
    }, [startDate])

    const displayEnd = useMemo(() => {
        const d = new Date(`${endDate}T00:00:00`)
        return `${d.getMonth() + 1}月${d.getDate()}日`
    }, [endDate])

    const handleLocate = async () => {
        try {
            const res = await Taro.getLocation({ type: 'gcj02' })
            setLocatedText(`已定位到 ${res.latitude.toFixed(4)}, ${res.longitude.toFixed(4)}`)
        } catch (e) {
            Taro.showToast({ title: '定位失败', icon: 'none' })
        }
    }

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    }

    const handleQuery = () => {
        console.log('query', {
            tab: tabs[activeTab],
            locatedText,
            locationLabel,
            keyword,
            startDate,
            endDate,
            guestRoom: guestRoomPresets[guestRoomIndex],
            filter: filterPresets[filterIndex],
            tags: selectedTags,
        })
        Taro.showToast({ title: '已点击查询', icon: 'none' })
    }

    return (
        <View className='w-full box-border px-3 -mt-8 relative z-20'>
            <View className='w-full box-border bg-white rounded-2xl px-4 pt-4 pb-5 shadow-md'>
                <View className='w-full box-border flex flex-row items-center justify-between'>
                    {tabs.map((t, idx) => (
                        <View
                            key={t}
                            className='box-border flex-1 flex flex-col items-center'
                            onClick={() => setActiveTab(idx)}
                        >
                            <Text className={idx === activeTab ? 'text-blue-600 text-base font-semibold' : 'text-gray-700 text-base'}>
                                {t}
                            </Text>
                            <View className={idx === activeTab ? 'mt-2 h-1 w-8 rounded-full bg-blue-600' : 'mt-2 h-1 w-8 rounded-full bg-transparent'} />
                        </View>
                    ))}
                </View>

                <View className='w-full box-border mt-3 bg-blue-50 rounded-xl px-3 py-2 flex flex-row items-center'>
                    <View className='w-2 h-2 rounded-full bg-blue-600' />
                    <Text className='ml-2 text-blue-700 text-sm'>{locatedText}</Text>
                </View>

                <View className='w-full box-border mt-3 rounded-2xl border border-gray-100 overflow-hidden'>
                    <View className='w-full box-border px-3 py-4 flex flex-row items-center'>
                        <View className='flex flex-row items-center' onClick={() => setLocationLabel(locationLabel === '我的位置' ? '当前位置' : '我的位置')}>
                            <Text className='text-lg font-semibold text-gray-900'>{locationLabel}</Text>
                            <Text className='ml-1 text-gray-400 text-sm'>▼</Text>
                        </View>

                        <View className='mx-3 w-px h-6 bg-gray-200' />

                        <Input
                            className='flex-1 text-lg text-gray-900'
                            placeholder='位置/品牌/酒店'
                            placeholderClass='text-gray-300'
                            value={keyword}
                            onInput={(e) => setKeyword((e?.detail?.value ?? '') as string)}
                        />

                        <View className='ml-2 box-border px-2 py-1 rounded-lg bg-blue-50' onClick={handleLocate}>
                            <Text className='text-blue-700 text-sm'>定位</Text>
                        </View>
                    </View>

                    <View className='w-full h-px bg-gray-100' />

                    <View className='w-full box-border px-3 py-4 flex flex-row items-center justify-between'>
                        <View className='flex flex-row items-center'>
                            <Picker
                                mode='date'
                                value={startDate}
                                onChange={(e) => {
                                    const next = (e?.detail?.value ?? '') as string
                                    setStartDate(next)
                                    if (next && endDate && next > endDate) setEndDate(next)
                                }}
                            >
                                <View className='flex flex-row items-end'>
                                    <Text className='text-2xl font-semibold text-gray-900'>{displayStart}</Text>
                                    <Text className='ml-2 text-gray-400 text-sm'>今天</Text>
                                </View>
                            </Picker>

                            <Text className='mx-2 text-gray-300 text-lg'>-</Text>

                            <Picker
                                mode='date'
                                value={endDate}
                                onChange={(e) => {
                                    const next = (e?.detail?.value ?? '') as string
                                    setEndDate(next)
                                    if (startDate && next && next < startDate) setStartDate(next)
                                }}
                            >
                                <View className='flex flex-row items-end'>
                                    <Text className='text-2xl font-semibold text-gray-900'>{displayEnd}</Text>
                                    <Text className='ml-2 text-gray-400 text-sm'>明天</Text>
                                </View>
                            </Picker>
                        </View>

                        <Text className='text-gray-700 text-base'>共{nights}晚</Text>
                    </View>

                    <View className='w-full h-px bg-gray-100' />

                    <View className='w-full box-border px-3 py-4 flex flex-row items-center'>
                        <Picker
                            mode='selector'
                            range={guestRoomPresets}
                            value={guestRoomIndex}
                            onChange={(e) => setGuestRoomIndex(Number(e?.detail?.value ?? 0))}
                        >
                            <View className='flex flex-row items-center'>
                                <Text className='text-lg font-semibold text-gray-900'>{guestRoomPresets[guestRoomIndex]}</Text>
                                <Text className='ml-1 text-gray-400 text-sm'>▼</Text>
                            </View>
                        </Picker>

                        <View className='mx-3 w-px h-6 bg-gray-200' />

                        <Picker
                            mode='selector'
                            range={filterPresets}
                            value={filterIndex}
                            onChange={(e) => setFilterIndex(Number(e?.detail?.value ?? 0))}
                        >
                            <View className='flex flex-row items-center'>
                                <Text className={filterIndex === 0 ? 'text-gray-300 text-lg' : 'text-gray-900 text-lg'}>
                                    {filterPresets[filterIndex]}
                                </Text>
                                <Text className='ml-1 text-gray-400 text-sm'>▼</Text>
                            </View>
                        </Picker>
                    </View>

                    <ScrollView scrollX className='w-full box-border px-3 pb-4' showScrollbar={false}>
                        <View className='flex flex-row flex-nowrap'>
                            {quickTags.map((tag) => {
                                const active = selectedTags.includes(tag)
                                return (
                                    <View
                                        key={tag}
                                        className={
                                            active
                                                ? 'mr-2 px-3 py-2 rounded-xl bg-gray-100'
                                                : 'mr-2 px-3 py-2 rounded-xl bg-gray-50'
                                        }
                                        onClick={() => toggleTag(tag)}
                                    >
                                        <Text className={active ? 'text-gray-900 text-base whitespace-nowrap' : 'text-gray-700 text-base whitespace-nowrap'}>{tag}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>

                    <View className='w-full box-border px-3 pb-4'>
                        <View
                            className='w-full box-border py-2 rounded-t-md rounded-bl-md rounded-br-4xl bg-blue-600 bg-gradient-to-r from-blue-400 to-blue-700 flex items-center justify-center'
                            onClick={handleQuery}
                        >
                            <Text className='text-white text-lg font-semibold'>查 询</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
