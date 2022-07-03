import { aws_dir_ } from './aws_dir_.js'
export async function aws_app_dir_():Promise<string> {
	const aws_dir = await aws_dir_()
	return `${aws_dir}/app`
}
