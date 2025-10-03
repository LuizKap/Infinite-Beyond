
import { fetchApi } from "./Fetchs.js"
import { Enterfullscreen, renderCards } from "./Renders.js"
import { search } from "./Search.js"
import { GamesResponse, Game } from "./Types.js"
import { showFavorites, errorh2, favoriteHandler } from "./utils.js"

// Recupera favoritos e query do localStorage

const query: string | null = localStorage.getItem('search')
let resultsNext: string | null | undefined

async function init(): Promise<string | null | undefined> {
    if (!query) return

    const title = document.getElementById('section-games-title') as HTMLElement
    const loadButton = document.querySelector('#load-button') as HTMLButtonElement
    loadButton.disabled = true

    const results: GamesResponse | null = await search(query)
    loadButton.disabled = false

    if (!results || results.results.length === 0) {
        errorh2(`I couldn't find any results for ${query} :(`)
        return
    }
	const fav: Game[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    renderCards(results)
    showFavorites(fav)
    title.textContent = `Showing Results For: ${query}`

    return results.next
}


document.querySelector('#cards-list')?.addEventListener('click', (ev): void => {
    const target = ev.target as HTMLImageElement | null
    if (!target) return

    favoriteHandler(target)

    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target)
    }
})

document.querySelector('#load-button')?.addEventListener('click', async (ev): Promise<void> => {
    const loadBtn = ev.currentTarget as HTMLButtonElement

    if (!resultsNext) {
        loadBtn.disabled = true
        loadBtn.textContent = 'NO MORE GAMES HERE :P'
        return
    }

    loadBtn.disabled = true
    loadBtn.textContent = 'LOADING MORE RESULTS :D'

    const nextResults: GamesResponse | null = await fetchApi(resultsNext)
    if (!nextResults) return

    renderCards(nextResults)
	
    const fav: Game[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    showFavorites(fav)

    resultsNext = nextResults.next
    loadBtn.disabled = false
    loadBtn.textContent = 'LOAD MORE'
})


resultsNext = await init()
