import { fetchApi } from "./Fetchs.js";
import { renderCards } from "./Renders.js";
import { ApiResponse, error } from "./Types.js";


export async function search(text: string) {

    
        if (!text) {
            return null
        }

        const games = await fetchApi<ApiResponse>(`https://api.rawg.io/api/games?search=${text}&page_size=5&`)

        if (!games) {
            error()
            return null
        }

        if (games.results.length === 0) {
            error()
            return null
        }
        renderCards(games)
    

}

export function showSearchInput(button: HTMLButtonElement) {
    const search_button = button
    const input = document.querySelector('#search-input') as HTMLInputElement

    if (!search_button) return

    search_button.style.display = 'none'
    input.style.display = 'flex'
    input.focus()
}

export function exitSearchInput(searchInput: HTMLInputElement) {
    const search_button = document.querySelector('#search-button') as HTMLButtonElement
    search_button.style.display = 'flex'
    searchInput.style.display = 'none'
}





