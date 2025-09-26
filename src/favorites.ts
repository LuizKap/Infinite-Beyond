
import { fetchApi } from "./Fetchs.js";
import { renderCards, ExitFullscreen, Enterfullscreen } from "./Renders.js";
import { favorites, Game } from "./Types.js";
import { errorh2, favoriteHandler, showFavorites } from "./utils.js";

let favorite: favorites[]
init()

async function init() {

    favorite = JSON.parse(localStorage.getItem('favorites') || '[]')

    if (favorite.length === 0) {
        errorh2('No favorite games yet')
    }

    const fav_games = await Promise.all(favorite.map(game => fetchApi<Game>(`https://api.rawg.io/api/games/${game.id}?`)))

    const validGames = fav_games.filter((game): game is Game => game !== null)

    if (validGames.length > 0) {
        renderCards(validGames)
    }

    showFavorites(favorite)
}

document.querySelector('#cards-list')?.addEventListener('click', (ev) => {

    const target = ev.target as HTMLImageElement | null
    favorite = favoriteHandler(target, favorite) as favorites[]
})

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


document.querySelector('#fullscreen-card')!.addEventListener('click', (event) => {
    ExitFullscreen(event)
})