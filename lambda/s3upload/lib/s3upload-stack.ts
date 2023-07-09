import * as cdk from 'aws-cdk-lib'
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
import { join } from 'path'

export class S3UploadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const wondebucket = new Bucket(this, 'wondebucketjay', {
      bucketName: 'wondebucketjay',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    // adding bucket policy for this bucket
    wondebucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new ServicePrincipal('lambda.amazonaws.com')],
        actions: ['s3:*'],
        resources: [`${wondebucket.bucketArn}/*`],
      })
    )

    // Lambda
    const uploadLambda = new NodejsFunction(this, 'Upload', {
      ...lambdaConfig({}),
      entry: join(__dirname, '../src/lambda/upload.ts'),
      environment: {
        BUCKET_NAME: wondebucket.bucketName,
      },
    })
    // Lambda permissiosn to upload to S3
    uploadLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:*'],
        resources: [`${wondebucket.bucketArn}/*`],
      })
    )
  }
}

/**
 * Common Lambda configurations
 *
 * @param param0
 * @returns
 */
export function lambdaConfig({ ...props }): NodejsFunctionProps {
  return {
    architecture: Architecture.ARM_64,
    runtime: Runtime.NODEJS_18_X,
    memorySize: 128,
    logRetention: RetentionDays.ONE_WEEK,
    bundling: {
      minify: false,
      sourceMap: true,
      target: 'ES2019',
      externalModules: ['aws-sdk'],
    },
    ...props,
  }
}
