import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';
import { rollup } from 'rollup';
import { EMOJI, OPTIONS } from './constants.mjs';
import { reportError } from './shared.mjs';

const bundlejs = async () => {
  try {
    const bundle = await rollup(OPTIONS.rollup.input);
    await bundle.write(OPTIONS.rollup.output);
    await bundle.close();
  } catch (error) {
    reportError(error);
  }
};

const processjs = async () => {
  console.info(`${EMOJI.barChart} Processing scripts`);

  try {
    await bundlejs();
    const data = await readFile('release/script.hash.js', {
      encoding: 'utf8'
    });
    const ast = parse(data, {
      sourceType: 'module'
    });
    const { code } = await transformFromAstAsync(ast, data, OPTIONS.babel);
    await writeFile('release/script.hash.js', code, { encoding: 'utf8' });
  } catch (error) {
    reportError(error);
  }
};

export default processjs;
