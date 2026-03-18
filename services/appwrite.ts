// Obtener la busqueda hecha por el usuario

const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

export const actualizarConteoBusqueda = async(busqueda:string, pelicula:Movie) =>{
    // chequar si la busqueda ya existe en la base de datos
    // Si el documento existe, actualizar el conteo
    // Si no existe, crear un nuevo documento con conteo 1
} 