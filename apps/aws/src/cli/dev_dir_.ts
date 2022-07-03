import { resolve } from 'path'
import { aws_dir_ } from './aws_dir_.js'
export async function dev_dir_():Promise<string> {
	const aws_dir = await aws_dir_()
	return resolve(`${aws_dir}/../..`)
}
