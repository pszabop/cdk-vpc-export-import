import '@aws-cdk/assert/jest';
import * as util from 'util';
import { App } from '@aws-cdk/core';
import { SrcStack, DestStack } from '../src/main';

test('Snapshot', () => {
  const app = new App();
  const exportingStack = new SrcStack(app, 'testExport');
  const importingStack = new DestStack(app, 'testImport');

  console.log(util.inspect(exportingStack, false, 5));
  console.log(util.inspect(importingStack, false, 5));
  expect(exportingStack).not.toHaveResource('AWS::S3::Bucket');
  expect(importingStack).not.toHaveResource('AWS::S3::Bucket');
  expect(app.synth().getStackArtifact(exportingStack.artifactId).template).toMatchSnapshot();
  expect(app.synth().getStackArtifact(importingStack.artifactId).template).toMatchSnapshot();
});
