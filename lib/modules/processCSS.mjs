import cssnanoPlugin from 'cssnano';
import { readFile, writeFile } from 'fs/promises';
import postcss from 'postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import url from 'postcss-url';
import { EMOJI, OPTIONS, logError, logMessage } from '../helpers/index.mjs';

const processCSS = async (input, output) => {
  logMessage(`${EMOJI.artistPalette} Processing styles`);
  const file = 'style.hash.css';

  try {
    const code = await _parseCSS(input, file);
    await writeFile(`${output}/${file}`, code);
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

async function _parseCSS(input, file) {
  try {
    const data = await readFile(`${input}/${file}`, { encoding: 'utf8' });
    const { css } = await postcss()
      .use(atImport())
      .use(postcssPresetEnv())
      .use(url(OPTIONS.postcss.url))
      .use(cssnanoPlugin(OPTIONS.postcss.cssnano))
      .process(data, { from: `${input}/${file}` });
    return css;
  } catch (error) {
    logError(error);
  }
}

export default processCSS;
