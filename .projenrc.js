const { Semver, AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary ({
  authorAddress: "paulszabopnw@gmail.com",
  name: "vpc-export-import",
  repository: "https://github.com/pszabop/vpc-export-import",
  keywords: [
    "cdk",
    "vpc",
  ],
  authorName: "Paul Szabo",
  cdkVersion: "1.63.0",
  cdkDependencies: [
    "@aws-cdk/aws-ec2",
    "@aws-cdk/aws-apigateway",
    "@aws-cdk/aws-dynamodb",
    "@aws-cdk/aws-lambda",
    "@aws-cdk/core"
  ],
  cdkTestDependencies: [
    "@aws-cdk/assert",
  ],

});


project.synth();
