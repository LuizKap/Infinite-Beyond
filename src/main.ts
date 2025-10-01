
import { fetchApi, fetchGenres } from "./Fetchs.js";
import { renderCards, renderGenresList } from "./Renders.js";
import { Enterfullscreen } from "./Renders.js";
import { exitSearchInput, showSearchInput } from "./Search.js";
import { Game, GamesResponse } from "./Types.js";
import { favoriteHandler, errorh2, showFavorites, animateGenres } from "./utils.js";

let next = await main()

document.querySelector('#genres-button')?.addEventListener('click', (): void => {
    animateGenres()
})

document.querySelector('#ul-genres')?.addEventListener('click', (ev): void => {
    const target = ev.target as HTMLButtonElement

    if (target.classList.contains('li-button-genres')) {
        localStorage.setItem('genreQuery', target.dataset.slug!)
        window.open('http://127.0.0.1:5500/pages/genre.html', '_blank')
        console.log(target.dataset.slug)
    }
})

//Adicionar jogo aos favoritos ou entrar no card fullscreen
document.querySelector('#cards-list')?.addEventListener('click', (ev): void => {
    const target = ev.target as HTMLImageElement | null
    if (!target) return

    favoriteHandler(target)

    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target)
    }
})

//Listener pra carregar mais jogos
document.querySelector('#load-button')!.addEventListener('click', async (ev): Promise<void> => {

    const loadBtn = ev.currentTarget as HTMLButtonElement

    if (next) {
        loadBtn.disabled = true
        loadBtn.textContent = 'LOADING MORE RESULTS :D'
        const games = await fetchApi<GamesResponse>(`${next}&`)
        loadBtn.disabled = false
        loadBtn.textContent = 'LOAD MORE'

        const fav: Game[] = JSON.parse(localStorage.getItem('favorites') || '[]')

        if (!games) return
        renderCards(games)
        showFavorites(fav)
        next = games.next
    } else {
        loadBtn.disabled = true
        loadBtn.textContent = 'NO MORE GAMES HERE :P'
    }

})

//Abrir search
document.querySelector('#search-button')!.addEventListener('click', (ev): void => {
    showSearchInput(ev.currentTarget as HTMLButtonElement)
})
//Fechar search
document.querySelector('#search-input')?.addEventListener('blur', (ev): void => {
    exitSearchInput(ev.currentTarget as HTMLInputElement)
})

//Pesquisar o jogo que voce quer. Se não tiver nada escrito aparece um alert e retorna.
document.querySelector('#search-input')?.addEventListener('keydown', (ev): void => {
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
async function main(): Promise< void | string | null> {
    const games = await fetchApi<GamesResponse>(`https://api.rawg.io/api/games?page_size=8&page=1&`)
    if (!games) {
        errorh2('Error :(')
        return
    }
    renderCards(games)

    const fav: Game[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    showFavorites(fav)

    const genres = await fetchGenres(1, 20)
    if (!genres) {
        errorh2('Error :(')
        return
    }
    renderGenresList(genres)

    return games.next
}




