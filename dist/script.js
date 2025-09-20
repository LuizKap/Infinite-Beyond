let currentPage = 1;
function elementConstructor(element, className, id) {
    const el = document.createElement(element);
    el.className = className ?? '';
    el.id = id ?? '';
    return el;
}
function imageConstructor(element, className, alt, id, src) {
    const img = document.createElement(element);
    img.id = id;
    img.className = className;
    img.alt = alt;
    img.src = src ?? '';
    img.loading = 'lazy';
    return img;
}
function renderCards(games) {
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
document.querySelector('#cards-list')?.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('cards-img')) {
        fullscreenCard(target);
    }
});
//listener pra sair do card full screen
document.querySelector('#fullscreen-card').addEventListener('click', (event) => {
    const main = document.querySelector('main');
    const target = event.currentTarget;
    target.style.display = 'none';
    main.style.removeProperty('filter');
});
document.querySelector('#load-button').addEventListener('click', async () => {
    currentPage++;
    const games = await fetchGames(16, currentPage);
    renderCards(games);
});
// Funcao generica so pra receber a resposta da api
async function fetchApi(url) {
    try {
        const response = await fetch(`${url}key=0af97debc3b541ab8e2e4d0bfe020a54`);
        if (!response.ok) {
            throw new Error(`Erro na requisição`);
        }
        const data = await response.json();
        if (!data) {
            console.log('Erro no response.json');
            throw new Error('Erro no response.json');
        }
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
//funcao para pegar os games
async function fetchGames(page_size, page) {
    try {
        const games = await fetchApi(`https://api.rawg.io/api/games?page_size=${page_size}&page=${page}&`);
        if (!games)
            throw new Error('Erro ao renderizar jogos');
        return games;
    }
    catch (error) {
        console.log(error);
    }
}
//funcao que vai pegar a div com a img e renderizar o game em fullscreen
async function fullscreenCard(target) {
    try {
        //console.log(target)
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
async function main() {
    const games = await fetchGames(16, 1);
    renderCards(games);
}
main();
export {};
//# sourceMappingURL=script.js.map