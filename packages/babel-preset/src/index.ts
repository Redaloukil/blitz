import type { TransformOptions } from '@babel/core';
import FixNodeFileTrace from './fix-node-file-trace';
import RewriteImports from './rewrite-imports';

// eslint-disable-next-line import/no-default-export
export default function preset(_api: any, options = {}) {
  // const isTest = _api.env('test');
  const isRunningInJest =
    process.env.JEST_WORKER_ID && !process.env.__NEXT_TEST_MODE;

  const config: TransformOptions = {
    presets: [[require('next/babel'), options]],
    plugins: [FixNodeFileTrace],
  };

  if (!isRunningInJest) {
    config.plugins!.push(RewriteImports);
  }

  return config;
}
