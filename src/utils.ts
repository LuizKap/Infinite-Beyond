import { Game, GamesResponse } from "./Types.js"

//Função genérica pra exibir mensagens de erro no H2 quando preciso
export function errorh2(text: string) {
    const h2 = document.querySelector('#section-games-title') as HTMLTitleElement
    h2.textContent = text
}


//função TypeGuard pra verificar se é do tipo GamesResponse
export function isGamesResponse(value: unknown): value is GamesResponse {
    return typeof value === 'object' && value !== null && 'results' in value
}


//Essa função carrega os jogos que ja estao favoritados, basicamente ela marca os que ja estão favoritados pra não causar nenhuma confusão entre as páginas
export function showFavorites(favorite: Game[]) {
    if (favorite.length === 0) return

    const cards = document.querySelectorAll('.cards')
    cards.forEach(card => {
        const game_fav_icon = card.querySelector<HTMLImageElement>('.favorite-icon')
        if (!game_fav_icon) return

        //Resetando pra nao duplicar true e boxshadow
        game_fav_icon.style.boxShadow = '';
        game_fav_icon.dataset.clicked = 'false';

        favorite.forEach(game => {
            if (game.id.toString() === game_fav_icon.id) {
                game_fav_icon.style.boxShadow = 'inset 0 0 10px 5px gold'
                game_fav_icon.dataset.clicked = 'true'
            }
        })
    })
}

//Cuida de adicionar ou remover dos favoritos
export function favoriteHandler(target: HTMLImageElement | null) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Game[]

    if (!target || !target.classList.contains('favorite-icon')) return

    if (favorites.some(game => game.id === parseInt(target.id))) {
        favorites = favorites.filter(game => game.id !== parseInt(target.id))
    }

    if (target.classList.contains('favorite-icon')) {

        const card = target.closest('.cards')
        const name = card?.querySelector('.games-title')?.textContent
        const backgroundImg = card?.querySelector('.cards-img') as HTMLImageElement

        if (!name || !target.id) {
            alert('I couldnt add your game to favorites :(')
            return
        }
        if (target.dataset.clicked === 'false') {
            let favorite: Game = { id: parseInt(target.id), name: name, background_image: backgroundImg.src }
            favorites.push(favorite)
            target.style.boxShadow = 'inset 0 0 10px 5px gold'
            target.dataset.clicked = 'true'

        } else {
            target.dataset.clicked = 'false'
            target.style.boxShadow = ''
            favorites = favorites.filter(game => game.id !== parseInt(target.id))

        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

export function animateGenres() {
    const sidebar = document.querySelector('#genres-sidebar') as HTMLElement
    const genre_button = document.querySelector('#genres-button') as HTMLButtonElement

    sidebar.classList.toggle('show')
    genre_button.classList.toggle('show')
}