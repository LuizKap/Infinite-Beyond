export function elementConstructor(element: string, className?: string, id?: string): HTMLElement {
    const el = document.createElement(element) as HTMLElement
    el.className = className ?? ''
    el.id = id ?? ''
    return el
}
export function imageConstructor(element: string, className: string, alt: string, id: string, src?: string, clicked?: string): HTMLImageElement {
    const img = document.createElement(element) as HTMLImageElement
    img.id = id
    img.className = className
    img.alt = alt
    img.src = src ?? ''
    img.loading = 'lazy'
    img.dataset.clicked = clicked
    return img
}

export function liGenresConstructor(name: string, slug: string): HTMLLIElement{
    const li: HTMLLIElement = document.createElement('li')
    const p: HTMLParagraphElement = document.createElement('p')
    const button: HTMLButtonElement = document.createElement('button')

    li.className = 'li-genres'
    button.dataset.slug = slug
    button.className = 'li-button-genres'
    button.textContent = name
    
    li.appendChild(button)
    li.appendChild(p)

    return li
}