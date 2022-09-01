import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';
import { rollup } from 'rollup';
import { EMOJI, OPTIONS } from './constants.mjs';
import { reportError } from './shared.mjs';

const bundlejs = async (input, output, files) => {
  try {
    const bundle = await rollup({
      input: `${input}/${files.js}`
    });
    await bundle.write({
      file: `${output}/${files.js}`
    });
    await bundle.close();
  } catch (error) {
    reportError(error);
  }
};

const processjs = async (input, output, files) => {
  console.info(`${EMOJI.barChart} Processing scripts`);

  try {
    await bundlejs(input, output, files);
    const data = await readFile(`${output}/${files.js}`, {
      encoding: 'utf8'
    });
    const ast = parse(data, {
      sourceType: 'module'
    });
    const { code } = await transformFromAstAsync(ast, data, OPTIONS.babel);
    await writeFile(`${output}/${files.js}`, code, { encoding: 'utf8' });
  } catch (error) {
    reportError(error);
  }
};

export default processjs;
