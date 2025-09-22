async function main() {
    const games = await fetchGames(16, 1);
    renderCards(games);
}
main();
export {};
//# sourceMappingURL=script.js.map