
export interface Game {
    id: number
    name: string
    background_image: string
    rating: number
    released: string
}

export type ApiResponse = {
    results: Game[]
}

export interface GameDetails extends Game {
    description: string
}
