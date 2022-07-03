import { has_dom } from '@ctx-core/dom'
export function isAndroid_():boolean {
  return !!(has_dom && window.cordova && window.cordova.platformId === 'android')
}
export const isAndroid = isAndroid_()
