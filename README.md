# AWS CDK Construct - export VPC from one stack, import to another
Unlike AWS CDK Constructs like DynamoDB, AWS did not provide the ability to easily export a VPC from
one stack and import it in another.  You can do it, but it's complicated, not documented anywhere, 
and makes your code messy.  This Construct was designed to solve that problem.

Why would one want to export and import a VPC?  Best practices. If for [some reason](https://github.com/aws/aws-cdk/issues/9854) 
you have to blow away part of your application to redeploy it, you shouldn't destroy your VPCs (or your 
databases, or...).  In other words stacks instances should be small and modular.  Just like
any good code.

Sure, you could manually create your VPCs and hard-code references to them, but this makes 
automatic creation of sandboxes very difficult or impossible.

## Object Structure of a VPC
per the CDK object model, which mirrors that of the CFT and thus the underlying
objects in AWS.

        VPC --- AvailabilityZones []
            --- Subnets (3 types) []
                --- RouteTables []
            --- vpnGatewayId
            --- vcpCidrBlock 
            --- ...

If you don't export the IDs of every one of these items and import them, you canmot recreate
the VPC without warnings, subtle failures in other entities such as EFS and Lambda, or
outright failures.  There are no working examples, AFAICT, of doing so.

# Usage
Anywhere you want to export a VPC from its and all its associated components from its creation
Stack and import the VPC and its associated components into another Stack.

## Module Usage

1. Add Module:

        npm install --save cdk-vpc-export-import

1. Import Statement:

        import VpcPortable from 'cdk-vpc-export-import';

1. General usage:

Use like any `Ec2.Vpc`.  Call the function `exportToStackOutput()` to export from the stack, and in the
stack that needs to use the vpc instance, call the static function `importFromStackOutput()`, which
follows the similar pattern to other `fromXXX()` in the CDK.  The object returned is a `Ec2.Vpc` 
that can be assigned as the network for a Lambda function, the network for an EFS file system, etc.


1. Use of global `exports` namespace on AWS

The stack exports functionality of CFT/CDK is used, which is a global namespace.  The name is mangled
with the stack name, the node.id of your VPC instance, and the names of the fields.  If for some unlikely
reason you get a collision or see problem please file an issue.  It would be easy to implement options
for alternative naming algorithms.

# Testing And Development
The development system is based on [Projen](importFromStackOutput), which while powerful and helpful, 
unfortunately doesn't have good documentation for a new user.

## Interactive Unit Testing and Development
1. Run Docker Compose:

        docker-compose run app  /bin/bash

1. Navigate to the directory where the source code is located:

        cd /home/code       

1. Run NPM install

        npm install
        
1. Compile

        yarn run compile

1. Run the unit tests

        yarn run test

1. Automatically run compile every time you save a file

        yarn run watch

1. Automatically run tests every time you save a test

        yarn run test:watch

1. Adding a module dependency.  Do not edit package.json.

        <editor> .projen.js

## Integration Test
This needs to be automated.  Why the CDK CLI doesn't have a wrapper NPM package by now, I have no idea.
I guess that should be next on the list of things I should write.

1. Change to the CD integration test directory

        cd integration-test

1. Run the build command. This will cause a synthesis of the stack and unit tests for the stack to run

        yarn run build

1. Run the deploy commands for the two stacks.  Assumes you have the environment variables or ~/.aws/credentials file mounted

        yarn run deploy exportStack
        yarn run deploy importStack

1. Run the integration test that tests the network connectivity

        yarn run ??? TBD ???

1. destroy the two stacks

        yarn run cdk destroy importStack
        yarn run cdk destroy exportStack

