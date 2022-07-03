import { spawn } from 'child_process'
import { capture } from '@ctx-core/child_process'
export async function pnpm_exec(pkg_name:string, argv:string[]):Promise<string> {
	return (
		await capture(
			spawn('pnpm', ['recursive', 'exec', '--filter', pkg_name, '--', ...argv])
		)
	).trim()
}
