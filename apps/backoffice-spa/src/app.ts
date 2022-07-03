// Initialize the Svelte app and inject it in the DOM
import { start } from '@menus/web/src/node_modules/@sapper/app.js'
const base = document.createElement('base')
base.href = window.__SAPPER__.baseUrl
document.body.appendChild(base)
start({ target: document.getElementById('sapper') })
declare global {
	interface Window {
		__SAPPER__:any
	}
}
