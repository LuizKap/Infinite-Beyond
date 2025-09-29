import { renderCards, ExitFullscreen, Enterfullscreen } from "./Renders.js";
import { errorh2, favoriteHandler, showFavorites } from "./utils.js";
init();
async function init() {
    let favorite = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorite.length === 0) {
        errorh2('No favorite games yet');
    }
    renderCards(favorite);
    showFavorites(favorite);
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
document.querySelector('#fullscreen-card').addEventListener('click', (event) => {
    ExitFullscreen(event);
});
//# sourceMappingURL=favorites.js.map