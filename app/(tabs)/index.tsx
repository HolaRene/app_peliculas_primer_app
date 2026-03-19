import BusquedaBar from "@/components/BusquedaBar";
import TarjetaPelicula from "@/components/tarjetaPelicula";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPeliculasPopulares } from "@/services/api";
import { obtenerPeliculasPopulares } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const ruta = useRouter()

  const { data: peliculasPopulares, loading: cargandoPeliculasPopulares, error: errorPeliculasPopulares } = useFetch(obtenerPeliculasPopulares)
  // console.log("Películas Populares:", peliculasPopulares);

  const { data: peliculas, loading: cargandoPeliculas, error: errorPeliculas, } = useFetch(() => fetchPeliculasPopulares({ consulta: "" }))

  // index primario
  return (
    <View
      className="flex-1  bg-primario"     >
      <Image source={images.bg} className="w-full z-0 absolute" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5" contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mx-auto mb-5 mt-20" />
        {cargandoPeliculas || cargandoPeliculasPopulares ? (
          <ActivityIndicator size="large" color="#fff" className="mt-10 self-center" />
        ) : errorPeliculas || errorPeliculasPopulares ? (
          <Text className="text-white mt-10 self-center">Error : {errorPeliculas?.message || errorPeliculasPopulares?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <BusquedaBar onPress={() => ruta.push("/busqueda")} placeholder="Buscar don..." />
            {
              peliculasPopulares && (
                <View className="mt-10">
                  <Text className="text-white text-lg font-bold mb-3">Películas Flexis</Text>
                  <FlatList
                    className="mb-4 mt-3"
                    data={peliculasPopulares}
                    renderItem={({ item, index }) => (
                      <Text className="text-lg text-white">{item.titulo}</Text>
                    )}
                    keyExtractor={(item) => item.pelicula_id.toString()}
                    horizontal
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20, gap: 15 }}
                  />
                </View>
              )
            }
            <>
              <Text className="text-white text-lg font-bold mb-3 mt-5">Últimas Películas</Text>
              <FlatList
                data={peliculas ?? []}
                renderItem={({ item }) => (
                  <TarjetaPelicula {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "flex-start", marginBottom: 10, gap: 20, paddingRight: 5 }}

                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
