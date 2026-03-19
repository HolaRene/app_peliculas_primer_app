import { Client, Databases, ID, Query } from 'react-native-appwrite';

// Obtener la busqueda hecha por el usuario

const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const cliente = new Client().setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);



const baseDatos = new Databases(cliente);



export const actualizarConteoBusqueda = async(busqueda:string, pelicula:Movie) =>{
 try {
    const resultado = await baseDatos.listDocuments(DB_ID, COLLECTION_ID, [
        Query.equal('terminoBusqueda', busqueda)
    ])
    // chequar si la busqueda ya existe en la base de datos
        if(resultado.documents.length > 0){
            const documento = resultado.documents[0]
            await baseDatos.updateDocument(DB_ID, COLLECTION_ID, documento.$id, {
                conteo: documento.conteo + 1,
                })
        } else {
            await baseDatos.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
                terminoBusqueda: busqueda,
                conteo: 1,
                pelicula_id: pelicula.id,
                posteo_url: `https://image.tmdb.org/t/p/w500/${pelicula?.poster_path}`,
                titulo: pelicula.title,
                })
            }   
            
    } catch (error) {
        console.error('Error al actualizar conteo de busqueda:', error)
    }
} 

export const obtenerPeliculasPopulares = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const resultado = await baseDatos.listDocuments(DB_ID, COLLECTION_ID, [
        Query.limit(5), Query.orderDesc('conteo')
    ])
        return resultado.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error('Error al obtener peliculas populares:', error)
        return undefined
       }
}