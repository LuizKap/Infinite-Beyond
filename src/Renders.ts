import { Game, type GamesResponse, type GameDetails, GenresResponse, GameMovies, GameScreenshot } from "./Types.js"
import { fetchApi } from "./Fetchs.js";
import { isGamesResponse } from "./utils.js";
import { elementConstructor, imageConstructor, liGenresConstructor } from "./Constructors.js";

export function renderCards(games: GamesResponse | Game[]): void {

    const cards_list = document.querySelector<HTMLElement>('#cards-list')
    if (!cards_list) return

    let gamesArray_gamesResponse = isGamesResponse(games) ? games.results : games

    gamesArray_gamesResponse.forEach(game => {
        const li = elementConstructor('li', 'li-cards')
        const div_cards = elementConstructor('div', 'cards')
        const img_game = imageConstructor('img', 'cards-img', 'game image', game.id.toString(), game.background_image)
        const div_favorite_title = elementConstructor('div', 'div-favorite_title')
        const img_favorite = imageConstructor('img', 'favorite-icon', 'favorite icon', game.id.toString(), "/build/img/heart-svgrepo-com.svg", 'false')
        const h3 = elementConstructor('h3', 'games-title')
        h3.textContent = game.name

        div_favorite_title.append(img_favorite, h3)
        div_cards.append(img_game, div_favorite_title)
        li.appendChild(div_cards)
        cards_list.appendChild(li)
    })
}

export async function Enterfullscreen(target: HTMLImageElement): Promise<null | void> {

    const game_detail = await fetchApi<GameDetails>(`https://api.rawg.io/api/games/${target.id}?`)
    const game_movies = await fetchApi<GameMovies>(`https://api.rawg.io/api/games/${target.id}/movies?`)
    const game_screenshot = await fetchApi<GameScreenshot>(`https://api.rawg.io/api/games/${target.id}/screenshots?`)

    const card = document.querySelector<HTMLElement>('#fullscreen-card')!
    const title = card.querySelector<HTMLElement>('#fullscreen-game-title')!
    const desc = card.querySelector<HTMLDivElement>("#fullscreen-game-description")!
    const img = card.querySelector<HTMLImageElement>('#fullscreen-img')!
    const div_container = document.querySelector<HTMLDivElement>('#div-fullscreen-trailer')!

    //Cria o exit e adicionar o evento de sair da fullscreen
    const exit = imageConstructor('img', 'exit', 'Exit FullScreen Game', 'exit-fullscreen', './img/delete-button.png')
    exit.addEventListener('click', () => {
        ExitFullscreen()
    })

    div_container.appendChild(exit)
    img.src = target.src
    title.textContent = game_detail?.name || 'Error'
    desc.innerHTML = game_detail?.description || 'No description found :/'
    card.style.display = 'flex'

    // Caso não haja trailers na api, vou adicionar um screenshot do jogo
    if (!game_movies || !game_movies.results || game_movies.results.length === 0) {
        let currentScreenshot: number = 0

        const screenshot = imageConstructor('img', '', 'Game Screenshot', 'game-screenshot', game_screenshot?.results[currentScreenshot]?.image ?? '')
        const arrow_right = imageConstructor('img', 'Arrow', 'Right Arrow', 'right-arrow', './img/rightArrow.png')
        const arrow_left = imageConstructor('img', 'Arrow', 'Left Arrow', 'left-arrow', './img/leftArrow.png')

        //No clique da seta da direita, vai usar o currenScreenshot como mediador pra ir pro proximo shot
        arrow_right.addEventListener('click', () => {

            // Se currentScreenshot chegar no fim ou próximo for undefined, volta pro primeiro.
            // (API retorna undefined no último item em alguns casos).
            if (currentScreenshot === game_screenshot?.count || !game_screenshot?.results[currentScreenshot + 1]?.image) {
                currentScreenshot = 0
                screenshot.src = game_screenshot?.results[currentScreenshot]?.image ?? ''
                return
            }
            currentScreenshot++
            screenshot.src = game_screenshot?.results[currentScreenshot]?.image ?? ''
        })
        
        arrow_left.addEventListener('click', () => {
            if (currentScreenshot === 0) return
            currentScreenshot--
            screenshot.src = game_screenshot?.results[currentScreenshot]?.image ?? ''
        })

        div_container.appendChild(screenshot)
        div_container.append(arrow_left, arrow_right)
        return
    }

    const video: HTMLVideoElement = document.createElement('video')
    video.id = 'fullscreen-trailer'
    video.controls = true
    video.autoplay = true
    video.src = game_movies.results[0]?.data?.max || ''

    div_container.appendChild(video)

}

export function ExitFullscreen(): void {
    const fullscreen_card = document.querySelector<HTMLDivElement>('#fullscreen-card')!
    const div_container = document.querySelector<HTMLDivElement>('#div-fullscreen-trailer')!
    fullscreen_card.style.display = 'none'
    div_container.innerHTML = ''
}

//Renderiza a lista de generos
export function renderGenresList(genresResponse: GenresResponse): void {

    genresResponse.results.forEach(genre => {
        const ul_genres = document.querySelector('#ul-genres') as HTMLUListElement
        const li_genres = liGenresConstructor(genre.name, genre.slug)

        ul_genres.appendChild(li_genres)
    })
}