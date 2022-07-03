import { spawn, SpawnOptionsWithoutStdio } from 'child_process'
import { pipe } from '@ctx-core/child_process'
export function cmd(
	command:string, args?:ReadonlyArray<string>, options?:SpawnOptionsWithoutStdio
):Promise<number> {
	return pipe(spawn(command, args, options))
}
