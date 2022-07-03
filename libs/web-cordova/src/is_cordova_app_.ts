import { is_cordova_ } from './is_cordova_'
export function is_cordova_app_() {
  return is_cordova_() && window.cordova.platformId !== 'browser'
}
export const is_cordova_app = is_cordova_app_()
