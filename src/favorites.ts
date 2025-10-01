
import { renderCards, Enterfullscreen } from "./Renders.js";
import { Game } from "./Types.js";
import { errorh2, favoriteHandler, showFavorites } from "./utils.js";


init()

async function init(): Promise<void> {

    let favorite = JSON.parse(localStorage.getItem('favorites') || '[]') as Game[]

    if (favorite.length === 0) {
        errorh2('No favorite games yet')
    }

    renderCards(favorite)
    showFavorites(favorite)
}

document.querySelector('#cards-list')?.addEventListener('click', (ev): void => {
    const target = ev.target as HTMLImageElement | null

    if (!target) return

        favoriteHandler(target)
  

    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target)
    }
})
