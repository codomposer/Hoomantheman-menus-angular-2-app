import { resolve } from '@menus/import-meta-resolve'
export const deploy_pay_static_dir = new URL(await resolve('./static', import.meta.url)).pathname
