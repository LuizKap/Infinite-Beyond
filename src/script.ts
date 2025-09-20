

let currentPage: number = 1
interface Game {
    id: number
    name: string
    background_image: string
    rating: number
    released: string
}

type ApiResponse = {
    results: Game[]
}

interface GameDetails extends Game {
    description: string
}

function elementConstructor(element: string, className?: string, id?: string): HTMLElement {

    const el = document.createElement(element) as HTMLElement
    el.className = className ?? ''
    el.id = id ?? ''
    return el
}

function imageConstructor(element: string, className: string, alt: string, id: string, src?: string): HTMLImageElement {

    const img = document.createElement(element) as HTMLImageElement
    img.id = id
    img.className = className
    img.alt = alt
    img.src = src ?? ''
    img.loading = 'lazy'
    return img
}

function renderCards(games?: ApiResponse) {

    const cards_list = document.querySelector<HTMLElement>('#cards-list')
    if (!cards_list) return

    games?.results.forEach(game => {
        const li = elementConstructor('li', 'li-cards')
        const div_cards = elementConstructor('div', 'cards')
        const img_game = imageConstructor('img', 'cards-img', 'game image', game.id.toString(), game.background_image)
        const div_favorite_title = elementConstructor('div', 'div-favorite_title')
        const img_favorite = imageConstructor('img', 'favorite-icon', 'favorite icon', game.id.toString(), "./img/heart-svgrepo-com.svg")
        const h3 = elementConstructor('h3', 'games-title')
        h3.textContent = game.name

        div_favorite_title.append(img_favorite, h3)
        div_cards.append(img_game, div_favorite_title)
        li.appendChild(div_cards)
        cards_list.appendChild(li)
    })

}

document.querySelector('#cards-list')?.addEventListener('click', (event) => {
    const target = event.target as HTMLImageElement

    if (target.classList.contains('cards-img')) {
        fullscreenCard(target)
    }

})

//listener pra sair do card full screen
document.querySelector('#fullscreen-card')!.addEventListener('click', (event) => {
    const main = document.querySelector('main') as HTMLElement
    const target = event.currentTarget as HTMLDivElement
    target.style.display = 'none'

    main.style.removeProperty('filter')

})

document.querySelector('#load-button')!.addEventListener('click', async () => {

    currentPage++
    const games = await fetchGames(16, currentPage)
    renderCards(games)

})


// Funcao generica so pra receber a resposta da api
async function fetchApi<T>(url: string): Promise<T> {
    try {
        const response: Response = await fetch(`${url}key=0af97debc3b541ab8e2e4d0bfe020a54`)
        if (!response.ok) {
            throw new Error(`Erro na requisição`)
        }

        const data = await response.json() as Promise<T>

        if (!data) {
            console.log('Erro no response.json')
            throw new Error('Erro no response.json')
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }

}

//funcao para pegar os games
async function fetchGames(page_size: number, page: number): Promise<ApiResponse | undefined> {

    try {
        const games = await fetchApi<ApiResponse>(`https://api.rawg.io/api/games?page_size=${page_size}&page=${page}&`)
        if (!games) throw new Error('Erro ao renderizar jogos')

        return games

    } catch (error) {
        console.log(error)
    }

}

//funcao que vai pegar a div com a img e renderizar o game em fullscreen
async function fullscreenCard(target: HTMLImageElement) {
    try {
        //console.log(target)

        const main = document?.querySelector<HTMLElement>('main')

        const game_detail = await fetchApi<GameDetails>(`https://api.rawg.io/api/games/${target.id}?`)

        if (!game_detail) throw new Error('Id nao encontrado')

        const full_card = document.querySelector<HTMLElement>('#fullscreen-card')

        const full_title = full_card?.querySelector<HTMLElement>('#fullscreen-game-title')
        const full_paragraph = full_card?.querySelector<HTMLParagraphElement>("#fullscreen-game-description")
        const full_img = full_card?.querySelector<HTMLImageElement>('#fullscreen-img')


        if (!full_img || !full_title || !full_paragraph || !full_card || !main) {
            throw new Error('Tag não encontrada')
        }

        full_img.src = target.src
        full_title.textContent = game_detail.name
        full_paragraph.innerHTML = game_detail.description
        full_card.style.display = 'flex'
        main.style.filter = 'blur(10px)'

    } catch (error) {
        console.log(error)
    }
}

async function main() {
    const games = await fetchGames(16, 1)
    renderCards(games)

}

main()



