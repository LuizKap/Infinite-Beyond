import { error, type ApiResponse } from "./Types.js";


export async function fetchApi<T>(url: string): Promise<T | null> {

    try {
        const response: Response = await fetch(`${url}key=0af97debc3b541ab8e2e4d0bfe020a54`)
        if (!response.ok) {
            console.log('Erro na requisição')
            error()
            return null
        }

        const data = await response.json() as T
        if (!data) {
            console.log('Erro no response.json')
            error()
            return null
        }
        return data

    } catch (error) {
        console.log(error)
        return null
    }
}


export async function fetchGames(page_size: number, page: number): Promise<ApiResponse | null> {

    const games = await fetchApi<ApiResponse>(`https://api.rawg.io/api/games?page_size=${page_size}&page=${page}&`)
    if (!games || !games.results || games.results.length === 0) {
        error()
        return null
    }
    if (!games.next) {
        const loadButton = document.querySelector('#load-button') as HTMLButtonElement
        if (loadButton) {
            loadButton.disabled = true
            loadButton.textContent = "Não há mais jogos :("
        }
    }

    return games
}

