import { fetchApi, fetchGenres } from "./Fetchs.js";
import { renderCards, renderGenresList, Enterfullscreen } from "./Renders.js";
import { exitSearchInput, showSearchInput } from "./Search.js";
import { favoriteHandler, errorh2, showFavorites, animateGenres } from "./utils.js";

let next = await main();

document.querySelector('#genres-button')?.addEventListener('click', () => {
    animateGenres();
});

document.querySelector('#ul-genres')?.addEventListener('click', (ev) => {
    const target = ev.target;
    if (target.classList.contains('li-button-genres')) {
        localStorage.setItem('genreQuery', target.dataset.slug);
        window.open('./genre.html', '_blank');
    }
});

// adicionar jogo aos favoritos ou fullscreen
document.querySelector('#cards-list')?.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!target) return;
    favoriteHandler(target);
    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target);
    }
});

// carregar mais jogos
document.querySelector('#load-button').addEventListener('click', async (ev) => {
    const loadBtn = ev.currentTarget;
    if (next) {
        loadBtn.disabled = true;
        loadBtn.textContent = 'LOADING MORE RESULTS :D';
        const games = await fetchApi(`${next}&`);
        loadBtn.disabled = false;
        loadBtn.textContent = 'LOAD MORE';
        const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!games) return;
        renderCards(games);
        showFavorites(fav);
        next = games.next;
    } else {
        loadBtn.disabled = true;
        loadBtn.textContent = 'NO MORE GAMES HERE :P';
    }
});

// search
document.querySelector('#search-button').addEventListener('click', (ev) => {
    showSearchInput(ev.currentTarget);
});

document.querySelector('#search-input')?.addEventListener('blur', (ev) => {
    exitSearchInput(ev.currentTarget);
});

document.querySelector('#search-input')?.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
        const search_input = ev.currentTarget;
        if (!search_input.value) {
            alert('You need to type something');
            return;
        }
        localStorage.setItem('search', search_input.value);
        window.open('./results.html', '_blank'); // ajustado também
    }
});

async function main() {
    const games = await fetchApi(`https://api.rawg.io/api/games?page_size=8&page=1&`);
    if (!games) {
        errorh2('Error :(');
        return;
    }
    renderCards(games);
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    showFavorites(fav);
    const genres = await fetchGenres(1, 20);
    if (!genres) {
        errorh2('Error :(');
        return;
    }
    renderGenresList(genres);
    return games.next;
}
