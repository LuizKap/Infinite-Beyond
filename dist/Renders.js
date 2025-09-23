import { fetchApi } from "./Fetchs.js";
import { elementConstructor, imageConstructor } from "./Constructors.js";
export function renderCards(games) {
    const cards_list = document.querySelector('#cards-list');
    if (!cards_list)
        return;
    games?.results.forEach(game => {
        const li = elementConstructor('li', 'li-cards');
        const div_cards = elementConstructor('div', 'cards');
        const img_game = imageConstructor('img', 'cards-img', 'game image', game.id.toString(), game.background_image);
        const div_favorite_title = elementConstructor('div', 'div-favorite_title');
        const img_favorite = imageConstructor('img', 'favorite-icon', 'favorite icon', game.id.toString(), "./img/heart-svgrepo-com.svg");
        const h3 = elementConstructor('h3', 'games-title');
        h3.textContent = game.name;
        div_favorite_title.append(img_favorite, h3);
        div_cards.append(img_game, div_favorite_title);
        li.appendChild(div_cards);
        cards_list.appendChild(li);
    });
}
export async function fullscreenCard(target) {
    try {
        const main = document?.querySelector('main');
        const game_detail = await fetchApi(`https://api.rawg.io/api/games/${target.id}?`);
        if (!game_detail)
            throw new Error('Id nao encontrado');
        const full_card = document.querySelector('#fullscreen-card');
        const full_title = full_card?.querySelector('#fullscreen-game-title');
        const full_paragraph = full_card?.querySelector("#fullscreen-game-description");
        const full_img = full_card?.querySelector('#fullscreen-img');
        if (!full_img || !full_title || !full_paragraph || !full_card || !main) {
            throw new Error('Tag não encontrada');
        }
        full_img.src = target.src;
        full_title.textContent = game_detail.name;
        full_paragraph.innerHTML = game_detail.description;
        full_card.style.display = 'flex';
        main.style.filter = 'blur(10px)';
    }
    catch (error) {
        console.log(error);
    }
}
export function ExitFullscreen(event) {
    const main = document.querySelector('main');
    const target = event.currentTarget;
    target.style.display = 'none';
    main.style.removeProperty('filter');
}
//# sourceMappingURL=Renders.js.map