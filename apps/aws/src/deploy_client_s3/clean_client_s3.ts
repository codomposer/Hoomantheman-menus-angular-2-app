import aws_sdk from 'aws-sdk'
const { S3 } = aws_sdk
import type { ListObjectsV2Output } from 'aws-sdk/clients/s3.js'
import ora from 'ora'
import { queue_ } from '@ctx-core/queue'
import { client_app_Keys_ } from './client_app_Keys_.js'
import { id_, stage_T } from '../common/index.js'
export async function clean_client_s3({ stage }:{ stage:stage_T }):Promise<void> {
	const id = id_(stage)
	const s3 = new S3()
	const { Buckets } = await s3.listBuckets().promise()
	const Bucket = Buckets.find(Bucket=>~Bucket.Name.indexOf(id))
	if (!Bucket) {
		console.warn(
			`Bucket does not exist for ${id}.`
		)
		return
	}
	const Keys = await client_app_Keys_()
	const Keys_h = Keys.reduce(
		(Keys_h, Key)=>{
			Keys_h[Key] = true
			return Keys_h
		},
		{} as Record<string, boolean>)
	const queue = queue_(8)
	const spinner = ora().start()
	let listObjectsV2Output:ListObjectsV2Output
	let total_count:number
	let current_count:number
	do {
		listObjectsV2Output = await s3.listObjectsV2({
			Bucket: Bucket.Name,
			ContinuationToken: listObjectsV2Output?.NextContinuationToken,
		}).promise()
		current_count = 0
		total_count = listObjectsV2Output.KeyCount
		spinner.text = ora_message_(current_count, total_count)
		await Promise.all(
			listObjectsV2Output.Contents.map(Content=>{
				const Key = Content.Key
				if (!Keys_h[Key]) {
					return queue.add(async ()=>{
						await s3.deleteObject({
							Bucket: Bucket.Name,
							Key
						})
						current_count += 1
						spinner.text = ora_message_(current_count, total_count)
					})
				}
				current_count += 1
				spinner.text = ora_message_(current_count, total_count)
			})
		)
	} while (listObjectsV2Output.NextContinuationToken)
	spinner.stop()
	function ora_message_(current_count, total_count) {
		return `Cleaning...${current_count} of ${total_count}`
	}
}
