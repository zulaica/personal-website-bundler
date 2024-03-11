import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';
import { rollup } from 'rollup';
import { EMOJI, OPTIONS, logError, logMessage } from '../helpers/index.mjs';

const processJS = async (input, output) => {
  logMessage(`${EMOJI.barChart} Processing scripts`);
  const file = 'script.hash.js';

  try {
    await _bundleJS(input, output, file);
    const code = await _parseJS(output, file);
    await writeFile(`${output}/${file}`, code, { encoding: 'utf8' });
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

async function _bundleJS(input, output, file) {
  try {
    const bundle = await rollup({ input: `${input}/${file}` });
    await bundle.write({ file: `${output}/${file}` });
    await bundle.close();
  } catch (error) {
    logError(error);
  }
}

async function _parseJS(output, file) {
  try {
    const data = await readFile(`${output}/${file}`, { encoding: 'utf8' });
    const ast = parse(data, { sourceType: 'module' });
    const { code } = await transformFromAstAsync(ast, data, OPTIONS.babel);
    return code;
  } catch (error) {
    logError(error);
  }
}

export default processJS;
