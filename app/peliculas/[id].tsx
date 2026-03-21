import { icons } from '@/constants/icons'
import { fetchDetallesPelicula } from '@/services/api'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface PeliculaDetallesProps {
    label: string
    value: string | number | null | undefined
}

const PeliculaDetalles = ({ label, value }: PeliculaDetallesProps) => (
    <View className='flex-col items-start justify-center mt-5'>
        <Text className='text-light-200 font-normal text-sm '>{label}</Text>
        <Text className='text-light-200 font-bold text-sm mt-2'>{value ?? 'N/A'}</Text>
    </View>
)

const DetallesPelículaId = () => {
    const { id } = useLocalSearchParams()

    const { data: pelicula, } = useFetch(() => fetchDetallesPelicula(id as string))
    return (
        <View className='bg-primario flex-1'>
            <ScrollView>
                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${pelicula?.poster_path}` }} className='w-full h-[550px]' resizeMode='stretch' />
                </View>
                <View className='flex-col items-start justify-center mt-5 px-5'>
                    <Text className='text-white text-xl font-bold'>{pelicula?.title}</Text>
                    <View className='flex-row items-center gap-x-1 mt-2'>
                        <Text className='text-light-200 text-sm'>{pelicula?.release_date?.split('-')[0]}</Text>
                        <Text className='text-light-200 text-sm'>{pelicula?.runtime}min</Text>
                    </View>
                    <View className='flex-row items-center gap-x-1 mt-2 rounded-md bg-dark-100 px-2 py-1'>
                        <Image source={icons.star} className='size-4' />
                        <Text className='text-white font-bold text-sm'>{Math.round(pelicula?.vote_average || 0)}/10</Text>
                        <Text className='text-light-200 text-sm'>({pelicula?.vote_count} votos)</Text>
                    </View>
                    <PeliculaDetalles label='Ver' value={pelicula?.overview} />
                    <PeliculaDetalles label='Género' value={pelicula?.genres?.map((g) => g.name).join(' - ') || 'N/A'} />

                    <View className='flex flex-row justify-between w-1/2'>
                        <PeliculaDetalles label='Presupuesto' value={`$${(pelicula?.budget || 0) / 1_000_000}M`} />
                        <PeliculaDetalles label='Recaudación' value={`$${(Math.round(pelicula?.revenue || 0) || 0) / 1_000_000}`} />
                        <PeliculaDetalles label='Compañía' value={pelicula?.production_companies?.map((c) => c.name).join(' - ') || 'N/A'} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-1.5 flex flex-row items-center justify-center z-50' onPress={router.back}>
                <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor={'#fff'} />
                <Text className='text-white font-semibold text-base'>Ir Atrás</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetallesPelículaId
