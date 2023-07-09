import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import * as S3Upload from '../lib/s3upload-stack'

test('S3 bucket & Lambda created', () => {
  const app = new cdk.App()
  // WHEN
  const stack = new S3Upload.S3UploadStack(app, 'TestS3UploadStack')
  // THEN
  const template = Template.fromStack(stack)
  console.log(`template: ${JSON.stringify(template, null, 2)}`)

  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'wondebucketjay',
  })

  template.hasResource('AWS::Lambda::Function', {})
})
