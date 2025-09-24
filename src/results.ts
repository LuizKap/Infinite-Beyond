
import { fetchApi } from "./Fetchs.js"
import { ExitFullscreen, fullscreenCard, renderCards } from "./Renders.js"
import { search } from "./Search.js"
import { ApiResponse, errorh2 } from "./Types.js"

const query = localStorage.getItem('search')
let next: string | null | undefined
init()

async function init() {
	next = await showResults()
	if (next) {
		const result_title = document.querySelector('#section-games-title') as HTMLTitleElement
		result_title.textContent = `Showing Results For: ${query}`
	}
}

async function showResults() {
	if (!query) {
		return
	}
	const results = await search(query)
	if (!results || results.results.length === 0) {
		errorh2(`I couldn't find any results for ${query} :(`)
		return
	}
	renderCards(results)
	return results.next
}

document.querySelector('#cards-list')?.addEventListener('click', (event) => {
    if (!event.target) {
        console.log('Erro no event.target fullscreen')
        return
    }
    const target = event.target as HTMLImageElement
    if (target.classList.contains('cards-img')) {
        fullscreenCard(target)
    }
})

document.querySelector('#fullscreen-card')?.addEventListener('click', (ev) => {
	ExitFullscreen(ev)
})


document.querySelector('#load-button')?.addEventListener('click', async (ev) => {
	const loadBtn = ev.currentTarget as HTMLButtonElement

	if (!next) {
		loadBtn.style.display = 'none'
		return
	}
	loadBtn.disabled = true
	loadBtn.textContent = 'LOADING MORE RESULTS :D'

	const nextUrl = next
	const next_results: ApiResponse | null = await fetchApi(nextUrl)
	if (!next_results) return

	renderCards(next_results)
	if (!next_results.next) return
	next = next_results.next

	loadBtn.disabled = false
	loadBtn.textContent = 'LOAD MORE'
})

