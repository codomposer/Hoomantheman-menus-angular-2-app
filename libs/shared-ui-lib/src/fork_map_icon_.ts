export function fork_map_icon_(color:string):string {
	const template = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="30px" height="30px" viewBox="8 8 32 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <path d="M24,40 C15.163444,40 8,32.836556 8,24 C8,15.163444 15.163444,8 24,8 C32.836556,8 40,15.163444 40,24 C40,32.836556 32.836556,40 24,40 Z" id="path-1"></path>
        <filter x="-17.2%" y="-10.9%" width="134.4%" height="134.4%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g id="UI-Kit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="another-restaurant-map">
            <g id="Oval-2-Copy-7" fill-rule="nonzero">
                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>
            </g>
            <path d="M24,36 C30.627417,36 36,30.627417 36,24 C36,17.372583 30.627417,12 24,12 C17.372583,12 12,17.372583 12,24 C12,30.627417 17.372583,36 24,36 Z" id="Path" fill="${color}"></path>
            <path d="M27,27.2047093 C27,27.850324 26.7152681,28.4125217 26.2235614,28.725016 L25.2929686,29.3078397 C25.0601504,29.4536826 24.9053161,29.7243771 24.9309329,30.1409145 L25.1632977,36 L22.8362489,36 L23.0432236,30.1409145 C23.0688404,29.7243771 22.9137794,29.4743087 22.6811879,29.3286484 L21.749915,28.7248334 C21.2591151,28.4123391 21,27.8713151 21,27.2045268 C21,24.2894953 21.2845052,22.4780506 21.4139494,20.6666058 C21.4656365,20.2086338 21.5690105,20 21.8274455,20 C22.0863339,20 22.1899346,20.2086338 22.2411682,20.6666058 L22.5256735,24.3311125 C22.5775872,24.5391987 22.7324215,24.6850415 22.8879359,24.6850415 C23.0432236,24.6850415 23.1985114,24.5391987 23.2499717,24.3311125 L23.6122341,20.6666058 C23.6376242,20.1874601 23.7672951,20 23.9998867,20 C24.2327049,20 24.3363056,20.1874601 24.3877659,20.6666058 L24.750255,24.3311125 C24.750255,24.5391987 24.9055428,24.6850415 25.0862206,24.6850415 C25.2929686,24.6850415 25.4482563,24.5391987 25.4482563,24.3311125 L25.7583784,20.6666058 C25.7844486,20.2086338 25.9141195,20 26.1723278,20 C26.405146,20 26.5343635,20.2086338 26.5602071,20.6666058 C26.7152681,22.4782331 27,24.2896778 27,27.2047093 Z" id="Shape-Copy-2" fill="#FFFFFF" fill-rule="nonzero"> </path>
        </g>
    </g>
</svg>`.trim()
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(template)}`
}
