import { transformFromAstAsync } from '@babel/core';
import { parse } from '@babel/parser';
import { readFile, writeFile } from 'fs/promises';
import { rollup } from 'rollup';
import { EMOJI, OPTIONS, logError, logMessage } from '../helpers/index.mjs';

const processJS = async ({ inputDir, outputDir }) => {
  logMessage(`${EMOJI.barChart} Processing scripts`);
  const file = 'script.hash.js';

  try {
    await _bundleJS(inputDir, outputDir, file);
    const code = await _parseJS(outputDir, file);
    await writeFile(`${outputDir}/${file}`, code);
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

async function _bundleJS(inputDir, outputDir, file) {
  try {
    const bundle = await rollup({ input: `${inputDir}/${file}` });
    await bundle.write({ file: `${outputDir}/${file}` });
    await bundle.close();
  } catch (error) {
    logError(error);
  }
}

async function _parseJS(outputDir, file) {
  try {
    const data = await readFile(`${outputDir}/${file}`, { encoding: 'utf8' });
    const ast = parse(data, { sourceType: 'module' });
    const { code } = await transformFromAstAsync(ast, data, OPTIONS.babel);
    return code;
  } catch (error) {
    logError(error);
  }
}

export default processJS;
