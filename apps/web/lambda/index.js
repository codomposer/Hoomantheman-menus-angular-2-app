'use strict'
// See https://stackoverflow.com/questions/66676555/nodejs-14-x-native-aws-lambda-import-export-support#comment120126806_66688901
/**
 * @type {Promise<{ServerlessHttp.Handler}>}
 */
const lambda_async = import('../lambda.js')
exports.handler = async (event, ctx) => {
	const lambda = await lambda_async
	return await lambda.handler(event, ctx)
}
