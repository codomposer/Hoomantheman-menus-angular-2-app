import { has_dom } from '@ctx-core/dom'
export function is_idfa_():boolean {
  return !!(has_dom && window.cordova && window.cordova.platformId !== 'android')
}
export const is_idfa = is_idfa_()
