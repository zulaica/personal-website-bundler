import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';
import { rollup } from 'rollup';
import { EMOJI, OPTIONS } from './constants.mjs';
import { reportError } from './shared.mjs';

const bundlejs = async (input, output) => {
  try {
    const bundle = await rollup({
      input: `${input}/script.hash.js`
    });
    await bundle.write({
      file: `${output}/script.hash.js`
    });
    await bundle.close();
  } catch (error) {
    reportError(error);
  }
};

const processjs = async (input, output) => {
  console.info(`${EMOJI.barChart} Processing scripts`);

  try {
    await bundlejs(input, output);
    const data = await readFile(`${output}/script.hash.js`, {
      encoding: 'utf8'
    });
    const ast = parse(data, {
      sourceType: 'module'
    });
    const { code } = await transformFromAstAsync(ast, data, OPTIONS.babel);
    await writeFile(`${output}/script.hash.js`, code, { encoding: 'utf8' });
  } catch (error) {
    reportError(error);
  }
};

export default processjs;
