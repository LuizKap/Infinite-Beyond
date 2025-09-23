export async function fetchApi(url) {
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
        const h2 = document.querySelector('#section-games-title');
        h2.textContent = 'Algo deu errado :( Tente recarregar a página';
        throw error;
    }
}
export async function fetchGames(page_size, page) {
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
//# sourceMappingURL=Fetchs.js.map