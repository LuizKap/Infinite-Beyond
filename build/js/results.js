import { fetchApi } from "../../dist/Fetchs.js";
import { Enterfullscreen, renderCards } from "../../dist/Renders.js";
import { search } from "../../dist/Search.js";
import { showFavorites, errorh2, favoriteHandler } from "../../dist/utils.js";
// Recupera favoritos e query do localStorage
const query = localStorage.getItem('search');
let resultsNext;
async function init() {
    if (!query)
        return;
    const title = document.getElementById('section-games-title');
    const loadButton = document.querySelector('#load-button');
    loadButton.disabled = true;
    const results = await search(query);
    loadButton.disabled = false;
    if (!results || results.results.length === 0) {
        errorh2(`I couldn't find any results for ${query} :(`);
        return;
    }
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    renderCards(results);
    showFavorites(fav);
    title.textContent = `Showing Results For: ${query}`;
    return results.next;
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
    if (!resultsNext) {
        loadBtn.disabled = true;
        loadBtn.textContent = 'NO MORE GAMES HERE :P';
        return;
    }
    loadBtn.disabled = true;
    loadBtn.textContent = 'LOADING MORE RESULTS :D';
    const nextResults = await fetchApi(resultsNext);
    if (!nextResults)
        return;
    renderCards(nextResults);
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    showFavorites(fav);
    resultsNext = nextResults.next;
    loadBtn.disabled = false;
    loadBtn.textContent = 'LOAD MORE';
});
resultsNext = await init();
//# sourceMappingURL=results.js.map