
import { fetchGames } from "./Fetchs.js";
import { renderCards } from "./Renders.js";
import { fullscreenCard, ExitFullscreen } from "./Renders.js";
import { exitSearchInput, showSearchInput } from "./Search.js";

let currentPage: number = 1

//Listener pra entrar no card fullscreen
document.querySelector('#cards-list')?.addEventListener('click', (event) => {
    const target = event.target as HTMLImageElement

    if (target.classList.contains('cards-img')) {
        fullscreenCard(target)
    }
})

// Listener pra sair do card fullscreen
document.querySelector('#fullscreen-card')!.addEventListener('click', (event) => {
    ExitFullscreen(event)
})

//Listener pra carregar mais jogos
document.querySelector('#load-button')!.addEventListener('click', async () => {
    currentPage++
    const games = await fetchGames(8, currentPage)
    if (!games) return
    renderCards(games)
})

//Abrir search
document.querySelector('#search-button')!.addEventListener('click', (ev) => {
    showSearchInput(ev.currentTarget as HTMLButtonElement)
})
//Fechar search
document.querySelector('#search-input')?.addEventListener('blur', (ev) => {
    exitSearchInput(ev.currentTarget as HTMLInputElement)
})

document.querySelector('#search-input')?.addEventListener('keydown', (ev) => {
    const event = ev as KeyboardEvent
    if (event.key === 'Enter') {
        const search_input = ev.currentTarget as HTMLInputElement
        localStorage.setItem('search', search_input.value)
        window.open('http://127.0.0.1:5500/results.html', '_blank')
    }
})

async function main() {
    const games = await fetchGames(8, 1)
    if (!games) return
    renderCards(games)

}
main()



