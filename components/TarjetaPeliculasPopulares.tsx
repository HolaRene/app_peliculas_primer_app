import { images } from '@/constants/images'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'


const TarjetaPeliculasPopulares = ({ pelicula, index }: { pelicula: TrendingMovie, index: number }) => {
    return (
        <Link href={`peliculas/${pelicula.pelicula_id}`} asChild>
            <TouchableOpacity className='w-32 relative pl-5'>
                <Image source={{ uri: pelicula.posteo_url }} className='w-32 h-48 rounded-lg mb-2' resizeMode='cover' />
                <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                    <MaskedView maskElement={
                        <Text className='text-white text-6xl font-bold'>{index + 1}</Text>
                    } >
                        <Image source={images.rankingGradient} className='size-14' resizeMode='cover' />
                    </MaskedView>
                    <Text className='text-light-200 text-sm mt2 font-bold' numberOfLines={2}>{pelicula.titulo}</Text>
                </View>
            </TouchableOpacity>

        </Link>
    )
}

export default TarjetaPeliculasPopulares