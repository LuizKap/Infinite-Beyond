
export interface Game {
    id: number
    name: string
    background_image: string
    rating: number
    released: string
}

export type ApiResponse = {
    results: Game[]
    next: string | null
}

export interface GameDetails extends Game {
    description: string
}

export function error(){
    const h2 = document.querySelector('#section-games-title') as HTMLTitleElement
    h2.textContent = 'Algo deu errado :( Tente recarregar a página'
}