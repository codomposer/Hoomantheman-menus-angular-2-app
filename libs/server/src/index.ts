import { has_dom } from '@ctx-core/dom'
if (has_dom) throw '@menus/server cannot run with a dom'
export * from './host_.js'
export * from './server_ctx.js'
