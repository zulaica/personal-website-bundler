import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';
import { rollup } from 'rollup';
import { EMOJI, logError, logMessage, OPTIONS } from '../helpers/index.mjs';

const bundlejs = async (input, output, file) => {
  try {
    const bundle = await rollup({
      input: `${input}/${file}`
    });
    await bundle.write({
      file: `${output}/${file}`
    });
    await bundle.close();
  } catch (error) {
    logError(error);
  }
};

const processjs = async (input, output, file) => {
  logMessage(`${EMOJI.barChart} Processing scripts`);

  try {
    await bundlejs(input, output, file);
    const data = await readFile(`${output}/${file}`, {
      encoding: 'utf8'
    });
    const ast = parse(data, {
      sourceType: 'module'
    });
    const { code } = await transformFromAstAsync(ast, data, OPTIONS.babel);
    await writeFile(`${output}/${file}`, code, { encoding: 'utf8' });
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

export default processjs;
