import { type GenresResponse, type GamesResponse } from "./Types.js";


export async function fetchApi<T>(url: string): Promise<T | null> {

    try {
        const response: Response = await fetch(`${url}key=0af97debc3b541ab8e2e4d0bfe020a54`)
        if (!response.ok) {
            console.log('Erro na requisição principal')

            return null
        }

        const data = await response.json() as T
        if (!data) {
            console.log('Erro no response.json')
            return null
        }
        return data

    } catch (error) {
        console.log(error)
        return null
    }
}

export async function fetchAllGames(page_size: number, url: string): Promise<GamesResponse | null> {
    
    const games = await fetchApi<GamesResponse>(`${url}?page_size=${page_size}&`)
    if (!games || !games.results || games.results.length === 0) {
        console.log('fetchAllGames error')
        return null
    }

    return games
}
export async function fetchGenres(page: number, page_size: number): Promise<GenresResponse | null> {

    const genres = await fetchApi<GenresResponse>(`https://api.rawg.io/api/genres?ordering=name&page=${page}&page_size=${page_size}&`)

    if (!genres || !genres.results || genres.results.length === 0) {
        console.log('fetchGenres error')
        return null
    }

    return genres
}

export async function fetchGamesPerGenres(genreSlug: string, page_size: number, page: number): Promise<GamesResponse | null> {

    const games = await fetchApi<GamesResponse>(`https://api.rawg.io/api/games?genres=${genreSlug}&page_size=${page_size}&page=${page}&`)
    if (!games || !games.results || games.results.length === 0) {
        console.log('fetchGamesGenres error')
        return null
    }

    return games
}



