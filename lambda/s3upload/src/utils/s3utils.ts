import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

/**
 * S3 utils using AWS Javascript SDK V3
 *
 * @author Jayakumar Jayaraman
 */

const client = new S3Client({})

/**
 * Upload given contents to S3
 *
 * @param Bucket
 * @param Key
 * @param Body
 */
export const upload = async (
  Bucket: string,
  Key: string,
  Body: string
): Promise<any> => {
  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body,
  })

  try {
    const response = await client.send(command)
    console.log(
      `Contents uplaoded to S3 successfully. Response: ${JSON.stringify(
        response
      )}`
    )
    return response
  } catch (err) {
    console.error(err)
    return err
  }
}
