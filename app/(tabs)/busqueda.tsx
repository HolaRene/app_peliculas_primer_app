import BusquedaBar from '@/components/BusquedaBar'
import TarjetaPelicula from '@/components/tarjetaPelicula'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchPeliculasPopulares } from '@/services/api'
import { actualizarConteoBusqueda } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'

const Busqueda = () => {

    const [busqueda, setBusqueda] = useState('')

    const { data: peliculas, loading: cargandoPeliculas, error: errorPeliculas, refetch: cargarPeliculas, reset: resetPeliculas } = useFetch(() =>
        fetchPeliculasPopulares({ consulta: busqueda }), false
    )
    useEffect(() => {
        const tiempoId = setTimeout(async () => {
            if (busqueda.trim() !== '') {
                await cargarPeliculas()

            } else {
                resetPeliculas()
            }
        }, 500)
        return () => clearTimeout(tiempoId);
    }, [busqueda])

    useEffect(() => {
        if (peliculas?.length > 0 && peliculas?.[0]) {
            actualizarConteoBusqueda(busqueda, peliculas?.[0])
        }

    }, [peliculas])

    return (
        <View
            className="flex-1  bg-primario"     >
            <Image source={images.bg} className="w-full z-0 absolute" />
            <FlatList
                data={peliculas}
                renderItem={({ item }) => <TarjetaPelicula {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3} className='px-5'
                columnWrapperStyle={{ justifyContent: "center", marginVertical: 16, gap: 16, }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className='w-full flex-row justify-center mt-20 items-center'>
                            <Image source={icons.logo} className='w-12 h-10' />
                        </View>
                        <View className='my-5'>
                            <BusquedaBar placeholder='Buscar Películas flexibles...' valor={busqueda}
                                onChangeText={(text: string) => setBusqueda(text)} />
                        </View>
                        {
                            cargandoPeliculas && <ActivityIndicator size='large' color='#fff' className='my-3' />
                        }
                        {
                            errorPeliculas && <Text className='text-red-500 my-3'>{errorPeliculas.message}</Text>
                        }
                        {
                            !cargandoPeliculas && !errorPeliculas && busqueda && peliculas?.length > 0 && (
                                <Text className='text-xl text-white font-bold'>
                                    Resultados para:{' '}<Text className='text-accent'>{busqueda}</Text>
                                </Text>
                            )
                        }
                    </>
                }
                ListEmptyComponent={
                    !cargandoPeliculas && !errorPeliculas ? (
                        <View className='mt-10 px-5'>
                            <Text className='text-center text-gray-500 text-lg'>
                                {busqueda.trim() === '' ? 'Ingresa un término de búsqueda para encontrar películas.' : 'No se encontraron resultados para tu búsqueda.'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

export default Busqueda

const styles = StyleSheet.create({})