import { Game, type ApiResponse, type GameDetails } from "./Types.js"
import { fetchApi } from "./Fetchs.js";
import { isApiResponse } from "./utils.js";
import { elementConstructor, imageConstructor } from "./Constructors.js";

export function renderCards(games: ApiResponse | Game[]) {

    const cards_list = document.querySelector<HTMLElement>('#cards-list')
    if (!cards_list) return

    let gamesArray_gamesResponse = isApiResponse(games) ? games.results : games

    gamesArray_gamesResponse.forEach(game => {
        const li = elementConstructor('li', 'li-cards')
        const div_cards = elementConstructor('div', 'cards')
        const img_game = imageConstructor('img', 'cards-img', 'game image', game.id.toString(), game.background_image)
        const div_favorite_title = elementConstructor('div', 'div-favorite_title')
        const img_favorite = imageConstructor('img', 'favorite-icon', 'favorite icon', game.id.toString(), "../img/heart-svgrepo-com.svg", 'false')
        const h3 = elementConstructor('h3', 'games-title')
        h3.textContent = game.name

        div_favorite_title.append(img_favorite, h3)
        div_cards.append(img_game, div_favorite_title)
        li.appendChild(div_cards)
        cards_list.appendChild(li)
    })
}

export async function Enterfullscreen(target: HTMLImageElement) {

    const main = document?.querySelector<HTMLElement>('main')

    const game_detail = await fetchApi<GameDetails>(`https://api.rawg.io/api/games/${target.id}?`)

    if (!game_detail) return null

    const full_card = document.querySelector<HTMLElement>('#fullscreen-card')

    const full_title = full_card?.querySelector<HTMLElement>('#fullscreen-game-title')
    const full_paragraph = full_card?.querySelector<HTMLParagraphElement>("#fullscreen-game-description")
    const full_img = full_card?.querySelector<HTMLImageElement>('#fullscreen-img')


    if (!full_img || !full_title || !full_paragraph || !full_card || !main) {
        return null
    }

    full_img.src = target.src
    full_title.textContent = game_detail.name
    full_paragraph.innerHTML = game_detail.description
    full_card.style.display = 'flex'
    main.style.filter = 'blur(10px)'
}

export function ExitFullscreen(event: Event): void {
    const main = document.querySelector('main') as HTMLElement
    const target = event.currentTarget as HTMLDivElement
    target.style.display = 'none'

    main.style.removeProperty('filter')
}