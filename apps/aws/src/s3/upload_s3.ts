import { readFile } from 'fs/promises'
import aws_sdk from 'aws-sdk'
const { S3 } = aws_sdk
import ora from 'ora'
import mime from 'mime'
const { getType } = mime
import { queue_ } from '@ctx-core/queue'
export async function upload_s3({ Keys, Name, dir }:upload_s3_params_T):Promise<void> {
	const s3 = new S3()
	const { Buckets } = await s3.listBuckets().promise()
	const Bucket = Buckets.find(Bucket=>Bucket.Name.indexOf(Name) === 0)
	if (!Bucket) {
		console.warn(
			`Bucket does not exist for ${Name}. Rerun upload_pay_s3.js script after Bucket is created.`
		)
		return
	}
	const total_count = Keys.length
	const queue = queue_(8)
	let current_count = 0
	const spinner = ora(ora_message_(current_count, total_count)).start()
	await Promise.all(
		Keys.map(Key=>{
			return queue.add(async ()=>{
				const Body = await readFile(`${dir}/${Key}`)
				await s3.putObject({
					Body,
					Bucket: Bucket.Name,
					Key,
					ContentType: ContentType_(Key)
				}).promise()
				current_count += 1
				spinner.text = ora_message_(current_count, total_count)
			})
		})
	)
	spinner.stop()
	function ora_message_(current_count, total_count) {
		return `Uploading...${current_count} of ${total_count}`
	}
}
function ContentType_(Key:string) {
	if (/\/APP_VERSION$/.test(Key)) {
		return 'text/plain'
	} else {
		return getType(Key)
	}
}
export interface upload_s3_params_T {
	Keys:string[]
	Name:string
	dir:string
}
