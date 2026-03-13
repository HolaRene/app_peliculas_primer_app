import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, titulo }: { focused: boolean, icon: any, titulo: string }) => {
    if (focused) return (
        <ImageBackground source={images.highlight} className='flex  flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center overflow-hidden items-center rounded-full '>

            <Image source={icon} tintColor='#151312' className='size-5' />
            <Text className='ml-2 text-secundario text-base font-semibold'>{titulo}</Text>

        </ImageBackground>
    )
    return (
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={icon} tintColor='#A8B5DB' className='size-5' />
        </View>
    )
}

export default function _Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#0f0d23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#A8B5DB',
                    overflow: 'hidden',
                }
            }}
        >
            <Tabs.Screen name="index" options={{
                headerShown: false, title: 'Inicio', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.home} titulo="Inicio" />
                )
            }} />
            <Tabs.Screen name="busqueda" options={{
                headerShown: false, title: 'Buscar', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.search} titulo="Buscar" />
                )
            }} />
            <Tabs.Screen name="guardado" options={{
                headerShown: false, title: 'Guardado', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.save} titulo="Guardado" />
                )
            }} />
            <Tabs.Screen name="perfil" options={{
                headerShown: false, title: 'Perfil', tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.person} titulo="Perfil" />
                )
            }} />
        </Tabs>
    )
}