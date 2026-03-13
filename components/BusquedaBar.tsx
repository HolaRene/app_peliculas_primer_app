import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface BusquedaBarProps {
    onPress?: () => void,
    placeholder: string
}

export default function BusquedaBar({ onPress, placeholder }: BusquedaBarProps) {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={'#ab8bff'} />
            <TextInput placeholder={placeholder} className='flex-1 ml-2 text-white' placeholderTextColor={'#a8b5db'} onPress={onPress} onChangeText={() => { }} value='' />
        </View>
    )
}