import type { ApiResponse } from "./Types.js";


export async function fetchApi<T>(url: string): Promise<T> {
    try {
        const response: Response = await fetch(`${url}key=0af97debc3b541ab8e2e4d0bfe020a54`)
        if (!response.ok) {
            throw new Error(`Erro na requisição`)
        }

        const data = await response.json() as Promise<T>

        if (!data) {
            console.log('Erro no response.json')
            throw new Error('Erro no response.json')
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }

}


export async function fetchGames(page_size: number, page: number): Promise<ApiResponse | undefined> {

    try {
        const games = await fetchApi<ApiResponse>(`https://api.rawg.io/api/games?page_size=${page_size}&page=${page}&`)
        if (!games) throw new Error('Erro ao renderizar jogos')

        return games

    } catch (error) {
        console.log(error)
    }

}

