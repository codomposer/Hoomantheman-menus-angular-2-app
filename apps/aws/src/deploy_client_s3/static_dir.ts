import { resolve } from '@menus/import-meta-resolve'
export const static_dir = new URL(await resolve(`../../app/static`, import.meta.url)).pathname
