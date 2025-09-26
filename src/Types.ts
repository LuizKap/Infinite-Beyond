
export interface Game {
    id: number
    name: string
    background_image: string
    rating: number
    released: string
}

export type ApiResponse = {
    results: Game[]
    count: number,
    next: string | null
}
export interface GameDetails extends Game {
    description: string
}

export type favorites = { id: string, name: string }

