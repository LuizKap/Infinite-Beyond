
import { fetchApi } from "./Fetchs.js"
import { ExitFullscreen, Enterfullscreen, renderCards } from "./Renders.js"
import { search } from "./Search.js"
import { ApiResponse, favorites } from "./Types.js"
import { showFavorites, errorh2, favoriteHandler } from "./utils.js"

let favorite: favorites[] = JSON.parse(localStorage.getItem('favorites') || '[]')
const query = localStorage.getItem('search')
let next: string | null | undefined

async function init() {
	next = await showResults()
	if (next) {
		const result_title = document.querySelector('#section-games-title') as HTMLTitleElement
		result_title.textContent = `Showing Results For: ${query}`
	}
	showFavorites(favorite)
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

document.querySelector('#cards-list')?.addEventListener('click', (ev) => {

	const target = ev.target as HTMLImageElement | null
	favorite = favoriteHandler(target, favorite) as favorites[]
})

document.querySelector('#cards-list')?.addEventListener('click', (event) => {
	if (!event.target) {
		console.log('Erro no event.target fullscreen')
		return
	}
	const target = event.target as HTMLImageElement
	if (target.classList.contains('cards-img')) {
		Enterfullscreen(target)
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

	showFavorites(favorite)
})

init()
