import { MAP_SEARCH_VIEW } from '@menus/web-config'
export function search_url_(keywords:string):string {
	return `/search?keywords=${decodeURIComponent(keywords)}&view=${MAP_SEARCH_VIEW}`
}
