//Função genérica pra exibir mensagens de erro no H2 quando preciso
export function errorh2(text) {
    const h2 = document.querySelector('#section-games-title');
    h2.textContent = text;
}
//Remove favoritos.
export function removeFavorite(array, target_id) {
    const arrayModified = array.filter(game => game.id !== target_id);
    return arrayModified;
}
//função TypeGuard pra verificar se é do tipo ApiResponse
export function isApiResponse(value) {
    return typeof value === 'object' && value !== null && 'results' in value;
}
//Essa função carrega os jogos que ja estao favoritados, basicamente ela marca os que ja estão favoritados pra não causar nenhuma confusão entre as páginas
export function showFavorites(favorite) {
    if (favorite.length === 0)
        return;
    const cards = document.querySelectorAll('.cards');
    cards.forEach(card => {
        const game_fav_icon = card.querySelector('.favorite-icon');
        if (!game_fav_icon)
            return;
        //Resetando pra nao duplicar true e boxshadow
        game_fav_icon.style.boxShadow = '';
        game_fav_icon.dataset.clicked = 'false';
        favorite.forEach(game => {
            if (game.id === game_fav_icon.id) {
                game_fav_icon.style.boxShadow = 'inset 0 0 10px 5px gold';
                game_fav_icon.dataset.clicked = 'true';
            }
        });
    });
}
//Cuida de adicionar ou remover dos favoritos
export function favoriteHandler(target, favorite) {
    if (!target || !target.classList.contains('favorite-icon'))
        return;
    if (target.classList.contains('favorite-icon')) {
        const id = target.id;
        const card = target.closest('.cards');
        const name = card?.querySelector('.games-title')?.textContent;
        if (!name || !id) {
            alert('I couldnt add your game to favorites :(');
            return;
        }
        if (target.dataset.clicked === 'false') {
            if (favorite.some(game => game.id === id)) {
                alert('This game is already in your favorites :P');
                return;
            }
            favorite.push({ id: id, name: name });
            target.style.boxShadow = 'inset 0 0 10px 5px gold';
            target.dataset.clicked = 'true';
            localStorage.setItem('favorites', JSON.stringify(favorite));
            return favorite;
        }
        else {
            target.dataset.clicked = 'false';
            target.style.boxShadow = '';
            favorite = removeFavorite(favorite, id);
            localStorage.setItem('favorites', JSON.stringify(favorite));
            return favorite;
        }
    }
}
//# sourceMappingURL=utils.js.map