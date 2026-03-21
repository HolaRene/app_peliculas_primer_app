import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Guardado = () => {
    return (
        <View className='bg-primario flex-1 px-10'>
            <View className='flex-col flex justify-center gap-5  items-center flex-1 '>
                <Image source={icons.save} className='size-10' tintColor={'#fff'} />
                <Text className='text-gray-500 text-base'>Guardado</Text>
            </View>
        </View>
    )
}

export default Guardado
