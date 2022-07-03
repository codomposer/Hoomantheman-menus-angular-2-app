#!/usr/bin/env node
import { readFile } from 'fs/promises'
const backoffice_spa_pkg = JSON.parse((await readFile('./package.json')).toString())
const web_pkg = JSON.parse((await readFile('../web/package.json')).toString())
console.info(`${backoffice_spa_pkg.version}-${web_pkg.version}`)
