/**
 * Lambda handler to upload contents to S3
 *
 * @param event
 * @param context
 */

import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { upload } from '../utils/s3utils'

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  console.log(
    `event: ${JSON.stringify(event)}, context: ${JSON.stringify(context)}`
  )

  const Bucket = process.env.BUCKET_NAME
  if (!Bucket) throw new Error(`Bucket not specified in environment`)

  const Key = 'wonde/lessons.json'
  const data = 'Hello world... s3 contents'

  const response = await upload(Bucket, Key, data)
  console.log(`response: ${JSON.stringify(response)}`)

  return `Data uplaoded to S3 ${JSON.stringify(response)}`
}
