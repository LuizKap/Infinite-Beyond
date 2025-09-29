
import { fetchApi, fetchGamesPerGenres } from "./Fetchs.js"
import { renderCards, Enterfullscreen, ExitFullscreen } from "./Renders.js"
import { Game, GamesResponse } from "./Types.js"
import { errorh2, favoriteHandler, showFavorites } from "./utils.js"

let gamesNext: string | null | undefined = await init()

async function init(): Promise<string | null | undefined> {
    const genreQuery: string | null = localStorage.getItem('genreQuery')
    const title = document.getElementById('section-games-title') as HTMLElement
    const loadButton = document.querySelector('#load-button') as HTMLButtonElement
    loadButton.disabled = true

    if (!genreQuery) {
        errorh2('Error loading genre :( Try again')
        return
    }

    const games: GamesResponse | null = await fetchGamesPerGenres(genreQuery, 8, 1)

    loadButton.disabled = false

    if (!games) {
        errorh2('Error loading genre :( Try again')
        return
    }
    const favorite = JSON.parse(localStorage.getItem('favorites') || '[]')

    renderCards(games)
    showFavorites(favorite)
    title.textContent = `FOUND ${games.count} GAMES WITH THE GENRE: ${genreQuery.toUpperCase()}`
    return games.next
}

document.querySelector('#cards-list')?.addEventListener('click', (ev) => {
    const target = ev.target as HTMLImageElement | null
    if (!target) return

    favoriteHandler(target)

    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target)
    }
})
document.querySelector('#fullscreen-card')?.addEventListener('click', (ev) => {
    ExitFullscreen(ev)
})

document.querySelector('#load-button')?.addEventListener('click', async (ev) => {
    const loadBtn = ev.currentTarget as HTMLButtonElement

    if (gamesNext) {
        loadBtn.textContent = 'LOADING MORE GAMES :D'
        loadBtn.disabled = true
        const next = await fetchApi<GamesResponse>(gamesNext)
        if (next) {
            const fav: Game[] = JSON.parse(localStorage.getItem('favorites') || '[]')
            showFavorites(fav)
            renderCards(next)
            loadBtn.textContent = 'LOAD MORE'
            loadBtn.disabled = false
            gamesNext = next.next
        }
        else {
            loadBtn.textContent = 'NO MORE GAMES HERE :P'
            loadBtn.disabled = true
        }
    }

})

