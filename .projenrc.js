const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorName: "Paul Szabo",
  authorAddress: "paulszabopnw@gmail.com",
  cdkVersion: "1.60.0",
  name: "code",
  repository: "https://github.com/user/code.git"
});

project.synth();
