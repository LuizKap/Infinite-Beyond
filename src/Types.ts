
export interface Game {
    id: number
    name: string
    background_image?: string
    rating?: number
    released?: string
}

export type GamesResponse = {
    results: Game[]
    count: number,
    next: string | null
}
export interface GameDetails extends Game {
    description: string
}



export type Genres = {
    id: number,
    name: string,
    slug: string
}

export interface GenresResponse {
    count: number,
    next: string | null,
    previous: string | null
    results: Genres[]
}