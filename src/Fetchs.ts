import { type ApiResponse } from "./Types.js";


export async function fetchApi<T>(url: string): Promise<T | null> {

    try {
        const response: Response = await fetch(`${url}key=0af97debc3b541ab8e2e4d0bfe020a54`)
        if (!response.ok) {
            console.log('Erro na requisição')

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

export async function fetchAllGames(page_size: number, page: number): Promise<ApiResponse | null> {

    const games = await fetchApi<ApiResponse>(`https://api.rawg.io/api/games?page_size=${page_size}&page=${page}&`)
    if (!games || !games.results || games.results.length === 0) {
        console.log('fetchAllGames error')
        return null
    }

    return games
}



