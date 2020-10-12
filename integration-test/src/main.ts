import * as Ec2 from '@aws-cdk/aws-ec2';
import * as Cdk from '@aws-cdk/core';
import { VpcPortable } from '../../src';
// @ts-ignore
import * as util from 'util'; // eslint-disable-line

const exportingStackName = 'exportStack';
const importingStackName = 'importStack';
const testVpcName = 'testVpc'

export class SrcStack extends Cdk.Stack {
  constructor(scope: Cdk.Construct, id: string, props: Cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
    const testVpc = new VpcPortable(this, testVpcName, {
      subnetConfiguration: [
        {
          cidrMask: 22,
          name: 'isolated',
          subnetType: Ec2.SubnetType.ISOLATED,
        },
        {
          cidrMask: 22,
          name: 'private',
          subnetType: Ec2.SubnetType.PRIVATE,
        },
        {
          cidrMask: 22,
          name: 'public',
          subnetType: Ec2.SubnetType.PUBLIC,
        },
      ],
    });

    testVpc.exportToStackOutput();
  }
}

export class DestStack extends Cdk.Stack {
  constructor(scope: Cdk.Construct, id: string, props: Cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
    const corporatedVpc = VpcPortable.importFromStackOutput(this, 'corporatedVpc', exportingStackName, testVpcName);
    console.log(`typeof: ${typeof corporatedVpc}`);

  }
}
// for development, use account/region from cdk cli
//
/*
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
*/

const app = new Cdk.App();

new SrcStack(app, exportingStackName);
new DestStack(app, importingStackName);
//new SrcStack(app, 'my-stack-dev', { env: devEnv });
// new SrcStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();
