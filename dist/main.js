import { fetchGames } from "./Fetchs.js";
import { renderCards } from "./Renders.js";
import { fullscreenCard } from "./Renders.js";
let currentPage = 1;
document.querySelector('#cards-list')?.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('cards-img')) {
        fullscreenCard(target);
    }
});
document.querySelector('#fullscreen-card').addEventListener('click', (event) => {
    const main = document.querySelector('main');
    const target = event.currentTarget;
    target.style.display = 'none';
    main.style.removeProperty('filter');
});
document.querySelector('#load-button').addEventListener('click', async () => {
    currentPage++;
    const games = await fetchGames(8, currentPage);
    renderCards(games);
});
async function main() {
    const games = await fetchGames(8, 1);
    renderCards(games);
}
main();
//# sourceMappingURL=main.js.map