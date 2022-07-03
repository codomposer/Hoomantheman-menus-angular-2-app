export function shopping_cart_icon_src_(color:string, size:string):string {
	size = size || '24px'
	const template = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>basket</title>
    <defs></defs>
    <g id="UI-Kit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="basket" fill-rule="nonzero" fill="${color}">
            <path d="M17.21,10 L12.83,3.44 C12.6400714,3.17105709 12.3291869,3.01374203 12,3.02 C11.68,3.02 11.36,3.16 11.17,3.45 L6.79,10 L2,10 C1.45,10 1,10.45 1,11 C1,11.09 1.01,11.18 1.04,11.27 L3.58,20.54 C3.81,21.38 4.58,22 5.5,22 L18.5,22 C19.42,22 20.19,21.38 20.43,20.54 L22.97,11.27 L23,11 C23,10.45 22.55,10 22,10 L17.21,10 Z M9,10 L12,5.6 L15,10 L9,10 Z" id="Shape"></path>
        </g>
    </g>
</svg>
  `.trim()
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(template)}`
}
