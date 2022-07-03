import { basename, dirname, extname, join } from 'path'
export function version_path_(file_path:string, version:string):string {
	if (version == null || version === '') return file_path
	const asset_dirname = dirname(file_path)
	const asset_extname = extname(file_path)
	const asset_basename = basename(file_path, asset_extname)
	return join(asset_dirname, `${asset_basename}.${version}${asset_extname}`)
}
