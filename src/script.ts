

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

interface GameDetails extends  Game {
    description: string
}

renderGames(16,1)

document.querySelectorAll('.cards-img').forEach(img => {
    img.addEventListener('click', (event) => {
        const target = event.currentTarget as HTMLImageElement
        fullscreenCard(target)
        
    })
})

document.querySelector('#fullscreen-card')?.addEventListener('click', (event)=>{
    const target = event.currentTarget as HTMLDivElement
    target.style.display = 'none'
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

//funcao para renderizar as imagens dos jogos
async function renderGames(page_size: number, page: number) {

    const games = await fetchApi<ApiResponse>(`https://api.rawg.io/api/games?page_size=${page_size}&page=${page}&`)

    if (!games) return

    document.querySelectorAll<HTMLImageElement>('.cards-img').forEach((img, i: number) => {
        img.src = games.results[i]?.background_image ?? 'IMG_ERROR'
        const  id_string = games.results[i]?.id.toString()
        if(!id_string) return

        img.id = id_string
    })
    document.querySelectorAll<HTMLTitleElement>('.games-title').forEach((title, i: number) => {
        title.textContent = games.results[i]?.name ?? 'TITLE ERROR'
    })
}

//funcao que vai pegar a div com a img e renderizar o game em fullscreen
async function fullscreenCard(target: HTMLImageElement) {
    try {


        const game_detail = await fetchApi<GameDetails>(`https://api.rawg.io/api/games/${target.id}?`)

        if(!game_detail) return

        const full_card = document.querySelector<HTMLElement>('#fullscreen-card')

        const full_title = full_card?.querySelector<HTMLElement>('#fullscreen-game-title')
        const full_paragraph = full_card?.querySelector<HTMLParagraphElement>("#fullscreen-game-description")
        const full_img = full_card?.querySelector<HTMLImageElement>('#fullscreen-img')
        

        if(!full_img || !full_title || !full_paragraph || !full_card){
            throw new Error('Tag não encontrada')
        }
        
        full_img.src = target.src
        full_title.textContent = game_detail.name
        full_paragraph.innerHTML = game_detail.description
        full_card.style.display = 'flex'
       


    } catch (error) {
        console.log(error)
    }
}

