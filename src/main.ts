
import { fetchAllGames } from "./Fetchs.js";
import { renderCards } from "./Renders.js";
import { Enterfullscreen, ExitFullscreen } from "./Renders.js";
import { exitSearchInput, showSearchInput } from "./Search.js";
import { favorites } from "./Types.js";
import { favoriteHandler, errorh2, showFavorites } from "./utils.js";

let currentPage: number = 1
let favorite: favorites[]

//Adicionar jogo aos favoritos
document.querySelector('#cards-list')?.addEventListener('click', (ev) => {

    const target = ev.target as HTMLImageElement | null
    favorite = favoriteHandler(target, favorite) as favorites[]
})

//Listener pra entrar no card fullscreen
document.querySelector('#cards-list')?.addEventListener('click', (event) => {
    if (!event.target) {
        console.log('Erro no event.target fullscreen')
        return
    }
    const target = event.target as HTMLImageElement
    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target)
    }
})

// Listener pra sair do card fullscreen
document.querySelector('#fullscreen-card')!.addEventListener('click', (event) => {
    ExitFullscreen(event)
})

//Listener pra carregar mais jogos
document.querySelector('#load-button')!.addEventListener('click', async (ev) => {
    currentPage++
    const loadBtn = ev.currentTarget as HTMLButtonElement

    loadBtn.disabled = true
    loadBtn.textContent = 'LOADING MORE RESULTS :D'

    const games = await fetchAllGames(8, currentPage)

    if (!games) {
        errorh2('Error :(')
        return
    }
    if (!games.next) {
        if (loadBtn) {
            loadBtn.disabled = true
            loadBtn.textContent = "No more games :("
            return
        }
    }
    loadBtn.disabled = false
    loadBtn.textContent = 'LOAD MORE'
    renderCards(games)
    showFavorites(favorite)
})

//Abrir search
document.querySelector('#search-button')!.addEventListener('click', (ev) => {
    showSearchInput(ev.currentTarget as HTMLButtonElement)
})
//Fechar search
document.querySelector('#search-input')?.addEventListener('blur', (ev) => {
    exitSearchInput(ev.currentTarget as HTMLInputElement)
})

//Pesquisar o jogo que voce quer. Se não tiver nada escrito aparece um alert e retorna.
document.querySelector('#search-input')?.addEventListener('keydown', (ev) => {
    const event = ev as KeyboardEvent
    if (event.key === 'Enter') {
        const search_input = ev.currentTarget as HTMLInputElement
        if (!search_input.value) {
            alert('You need to type something')
            return
        }
        localStorage.setItem('search', search_input.value)
        window.open('http://127.0.0.1:5500/pages/results.html', '_blank')
    }
})

//É executado toda vez que a página carrega pra carregar os 8 primeiros jogos e pegar os favoritos do localStorage
async function main() {
    const games = await fetchAllGames(8, 1)
    if (!games) {
        errorh2('Error :(')
        return
    }
    renderCards(games)
    const fav: favorites[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    favorite = fav
    showFavorites(favorite)
}

main()



