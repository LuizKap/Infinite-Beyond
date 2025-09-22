export function elementConstructor(element: string, className?: string, id?: string): HTMLElement {
    const el = document.createElement(element) as HTMLElement
    el.className = className ?? ''
    el.id = id ?? ''
    return el
}
export function imageConstructor(element: string, className: string, alt: string, id: string, src?: string): HTMLImageElement {
    const img = document.createElement(element) as HTMLImageElement
    img.id = id
    img.className = className
    img.alt = alt
    img.src = src ?? ''
    img.loading = 'lazy'
    return img
}