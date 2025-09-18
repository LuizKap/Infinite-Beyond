async function fetchApi(page_size, page) {
    const response = await fetch(`https://api.rawg.io/api/games?key=0af97debc3b541ab8e2e4d0bfe020a54&page_size=${page_size}&page=${page}`);
    const games = await response.json();
    return games;
}
async function renderGames() {
    const games = await fetchApi(16, 1);
    document.querySelectorAll('.cards-img').forEach((el, i) => {
        const img = el;
        img.src = games.results[i].background_image;
    });
}
renderGames();
export {};
//# sourceMappingURL=script.js.map