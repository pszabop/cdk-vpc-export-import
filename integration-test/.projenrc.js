const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  authorAddress: "paulszabopnw@gmail.com",
  name: "vpc-export-import",
  uthorName: "Paul Szabo",
  cdkVersion: "1.63.0",
  name: "integration-test",
  cdkDependencies: [
    "@aws-cdk/aws-ec2",
    "@aws-cdk/aws-apigateway",
    "@aws-cdk/aws-dynamodb",
    "@aws-cdk/aws-lambda",
    "@aws-cdk/core"
  ],
  cdkTestDependencies: [
    "@aws-cdk/assert"
  ],

});

project.synth();
