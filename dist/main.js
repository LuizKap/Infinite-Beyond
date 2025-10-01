import { fetchApi, fetchGenres } from "./Fetchs.js";
import { renderCards, renderGenresList } from "./Renders.js";
import { Enterfullscreen } from "./Renders.js";
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
        window.open('http://127.0.0.1:5500/pages/genre.html', '_blank');
        console.log(target.dataset.slug);
    }
});
//Adicionar jogo aos favoritos ou entrar no card fullscreen
document.querySelector('#cards-list')?.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!target)
        return;
    favoriteHandler(target);
    if (target.classList.contains('cards-img')) {
        Enterfullscreen(target);
    }
});
//Listener pra carregar mais jogos
document.querySelector('#load-button').addEventListener('click', async (ev) => {
    const loadBtn = ev.currentTarget;
    if (next) {
        loadBtn.disabled = true;
        loadBtn.textContent = 'LOADING MORE RESULTS :D';
        const games = await fetchApi(`${next}&`);
        loadBtn.disabled = false;
        loadBtn.textContent = 'LOAD MORE';
        const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!games)
            return;
        renderCards(games);
        showFavorites(fav);
        next = games.next;
    }
    else {
        loadBtn.disabled = true;
        loadBtn.textContent = 'NO MORE GAMES HERE :P';
    }
});
//Abrir search
document.querySelector('#search-button').addEventListener('click', (ev) => {
    showSearchInput(ev.currentTarget);
});
//Fechar search
document.querySelector('#search-input')?.addEventListener('blur', (ev) => {
    exitSearchInput(ev.currentTarget);
});
//Pesquisar o jogo que voce quer. Se não tiver nada escrito aparece um alert e retorna.
document.querySelector('#search-input')?.addEventListener('keydown', (ev) => {
    const event = ev;
    if (event.key === 'Enter') {
        const search_input = ev.currentTarget;
        if (!search_input.value) {
            alert('You need to type something');
            return;
        }
        localStorage.setItem('search', search_input.value);
        window.open('http://127.0.0.1:5500/pages/results.html', '_blank');
    }
});
//É executado toda vez que a página carrega pra carregar os 8 primeiros jogos e pegar os favoritos do localStorage
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
//# sourceMappingURL=main.js.map