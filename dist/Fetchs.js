export async function fetchApi(url) {
    try {
        const response = await fetch(`${url}key=0af97debc3b541ab8e2e4d0bfe020a54`);
        if (!response.ok) {
            console.log('Erro na requisição');
            return null;
        }
        const data = await response.json();
        if (!data) {
            console.log('Erro no response.json');
            return null;
        }
        return data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
export async function fetchGames(page_size, page) {
    const games = await fetchApi(`https://api.rawg.io/api/games?page_size=${page_size}&page=${page}&`);
    if (!games || !games.results || games.results.length === 0) {
        console.log('FetchGames error');
        return null;
    }
    return games;
}
//# sourceMappingURL=Fetchs.js.map