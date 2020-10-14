const { Semver, AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorName: "Paul Szabo",
  authorAddress: "paulszabopnw@gmail.com",
  name: "vpc-export-import",
  repository: "https://github.com/pszabop/vpc-export-import",
  npmignore: [
    '/integration-test',
  ],
  jestOptions: {
    ignorePatterns: [
    "node_modules/",       // default
    "integration-test/",
    ],
  },
  keywords: [
    "cdk",
    "vpc",
  ],
  cdkVersion: "1.63.0",
  cdkDependencies: [
    "@aws-cdk/aws-ec2",
    "@aws-cdk/core",
  ],
  cdkTestDependencies: [
    "@aws-cdk/assert",
  ],
});


project.synth();
