import fs from 'fs'
export function load_babel_():load_babel_T {
	return {
		async load(id:string) {
			if (/@babel/.test(id)) {
				if (!fs.existsSync(id)) {
					if (fs.existsSync(`${id}.js`)) {
						return fs.readFileSync(`${id}.js`).toString()
					}
					if (fs.existsSync(`${id}.mjs`)) {
						return fs.readFileSync(`${id}.mjs`).toString()
					}
				}
			}
		}
	}
}
export interface load_babel_T {
	load:(id:string)=>Promise<string>
}
