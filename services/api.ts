export const TMDB_CONFIG ={
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchPeliculasPopulares = async ({consulta}: {consulta: string}) => {
    const endPoint=consulta ?
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(consulta)}`:`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endPoint,{
        method: 'GET',
        headers: TMDB_CONFIG.headers
        })
    if(!response.ok) throw new Error('Error al obtener las películas', {cause: response.statusText})
    const data = await response.json()
    return data?.results ?? []
}

export const fetchDetallesPelicula = async (id: string):Promise<MovieDetails | undefined> => {
    try {
            const respuesta = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`,{
                method: 'GET',
                headers: TMDB_CONFIG.headers
            })
            if (!respuesta.ok) throw new Error('Error al obtener los detalles de la película', {cause: respuesta.statusText})
            const data = await respuesta.json()
            return data
    } catch (error) {
        console.log('Ha ocurrido un error al obtener los detalles de la película:', error)
    }
}