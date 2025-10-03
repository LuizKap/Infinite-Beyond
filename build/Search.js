import { fetchApi } from "../dist/Fetchs.js";
export async function search(text) {
    if (!text) {
        return null;
    }
    const games = await fetchApi(`https://api.rawg.io/api/games?search=${text}&page_size=5&`);
    if (!games || !games.results || games.results.length === 0) {
        return null;
    }
    return games;
}
export function showSearchInput(button) {
    const search_button = button;
    const input = document.querySelector('#search-input');
    search_button.style.display = 'none';
    input.style.display = 'flex';
    input.focus();
}
export function exitSearchInput(searchInput) {
    const search_button = document.querySelector('#search-button');
    search_button.style.display = 'flex';
    searchInput.style.display = 'none';
    searchInput.value = '';
}
//# sourceMappingURL=Search.js.map