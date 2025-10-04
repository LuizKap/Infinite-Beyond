import { fetchApi, fetchGamesPerGenres } from "../../dist/Fetchs.js";
import { renderCards, Enterfullscreen } from "../../dist/Renders.js";
import { errorh2, favoriteHandler, showFavorites } from "../../dist/utils.js";
let gamesNext = await init();
async function init() {
    const genreQuery = localStorage.getItem('genreQuery');
    const title = document.getElementById('section-games-title');
    const loadButton = document.querySelector('#load-button');
    loadButton.disabled = true;
    if (!genreQuery) {
        errorh2('Error loading genre :( Try again');
        return;
    }
    const games = await fetchGamesPerGenres(genreQuery, 8, 1);
    loadButton.disabled = false;
    if (!games) {
        errorh2('Error loading genre :( Try again');
        return;
    }
    const favorite = JSON.parse(localStorage.getItem('favorites') || '[]');
    renderCards(games);
    showFavorites(favorite);
    title.textContent = `FOUND ${games.count} GAMES WITH THE GENRE: ${genreQuery.toUpperCase()}`;
    return games.next;
}
document.querySelector('#cards-list')?.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!target)
        return;
    favoriteHandler(target);
    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target);
    }
});
document.querySelector('#load-button')?.addEventListener('click', async (ev) => {
    const loadBtn = ev.currentTarget;
    if (gamesNext) {
        loadBtn.textContent = 'LOADING MORE GAMES :D';
        loadBtn.disabled = true;
        const next = await fetchApi(gamesNext);
        if (next) {
            const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
            showFavorites(fav);
            renderCards(next);
            loadBtn.textContent = 'LOAD MORE';
            loadBtn.disabled = false;
            gamesNext = next.next;
        }
        else {
            loadBtn.textContent = 'NO MORE GAMES HERE :P';
            loadBtn.disabled = true;
        }
    }
});
//# sourceMappingURL=genre.js.map