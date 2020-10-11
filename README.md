# AWS CDK Construct - export VPC from one stack, import to another
Unlike AWS CDK Constructs like DynamoDB, AWS did not provide the ability to easily export a VPC from
one stack and import it in another.  You can do it, but it's complicated, not documented anywhere, 
and makes your code messy.  This Construct was designed to solve that problem.

Why would one want to export and import a VPC?  Best practices. If for some reason you have to 
blow away part of your application to redeploy it, you shouldn't destroy your VPCs (or your 
databases, or...).  In other words stacks instances should be small and modular.  Just like
any good code.

Sure, you could manually create your VPCs and hard-code references to them, but this makes 
automatic creation of sandboxes very difficult or impossible.

## Object Structure of a VPC
per the CDK object model, which mirrors that of the CFT and thus the underlying
objects in AWS.

        VPC --- CIDRs
            --- Subnets []
                --- Routes [] 
            --- Security Groups []
            --- ...

If you don't export the IDs of every one of these items and import them, you canmot recreate
the VPC.  There are no working examples, AFAICT, of doing so.

# Usage
Anywhere you want to export a VPC from its and all its associated components from its creation
Stack and import the VPC and its associated components into another Stack.

## Module Usage

1. Add Module:

        npm install --save vpc-export-import

1. Require Statement:

        const vpcExportImport = require('vpc-export-import');

1. General usage:


# Testing
## Interactive Testing
1. Run Docker Compose:

        docker-compose run app  /bin/bash

1. Navigate to the directory where the source code is located:

        cd /home/code       

1. Run NPM install

        npm install
        
1. Run the unit tests

        npm test test/*.js


