#!/usr/bin/env node
import { exec } from 'child-process-promise'
/**
 * @type string
 */
const dev_zip_file_name = `backoffice-${process.env.APP_VERSION}.dev.zip`
await exec(`cd dist/dev && zip -r ../../${dev_zip_file_name} dist`)
const live_zip_file_name = `backoffice-${process.env.APP_VERSION}.live.zip`
await exec(`cd dist/live && zip -r ../../${live_zip_file_name} dist`)
console.info(dev_zip_file_name)
console.info(live_zip_file_name)
