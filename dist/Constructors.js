export function elementConstructor(element, className, id) {
    const el = document.createElement(element);
    el.className = className ?? '';
    el.id = id ?? '';
    return el;
}
export function imageConstructor(element, className, alt, id, src) {
    const img = document.createElement(element);
    img.id = id;
    img.className = className;
    img.alt = alt;
    img.src = src ?? '';
    img.loading = 'lazy';
    return img;
}
//# sourceMappingURL=Constructors.js.map