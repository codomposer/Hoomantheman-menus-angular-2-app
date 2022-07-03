import type { Instance } from 'aws-sdk/clients/ec2'
import EC2 from 'aws-sdk/clients/ec2.js'
import { B, be_, assign } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { aws_env } from '../aws_env.js'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'menusappbuilder_Instance$'
export const menusappbuilder_Instance$_b:B<aws_Ctx, typeof key> = be_(key, ()=>{
	const menusappbuilder_Instance = writable$<Instance>(null)
	const busy$ = writable$<boolean>(false)
	load().then()
	return assign(menusappbuilder_Instance, {
		busy$,
		load
	})
	async function load() {
		busy$.set(true)
		try {
			const ec2 = new EC2()
			const { MENUSAPPBUILDER_INSTANCE_ID } = aws_env
			const describeInstances_response = await ec2.describeInstances({
				InstanceIds: [MENUSAPPBUILDER_INSTANCE_ID],
			}).promise()
			menusappbuilder_Instance.set(
				describeInstances_response.Reservations[0].Instances[0]
			)
		} finally {
			busy$.set(false)
		}
	}
})
export interface menusappbuilder_Instance$_T extends Writable$<Instance> {
	busy$:Writable$<boolean>
	load():Promise<void>
}
