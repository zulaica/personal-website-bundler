import cssnanoPlugin from 'cssnano';
import { readFile, writeFile } from 'fs/promises';
import postcss from 'postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import url from 'postcss-url';
import { EMOJI, logError, logMessage, OPTIONS } from '../helpers/index.mjs';

const processCSS = async (input, output, file) => {
  logMessage(`${EMOJI.artistPalette} Processing styles`);
  try {
    const data = await readFile(`${input}/${file}`, {
      encoding: 'utf8'
    });
    await postcss()
      .use(atImport())
      .use(postcssPresetEnv())
      .use(url(OPTIONS.postcss.url))
      .use(cssnanoPlugin(OPTIONS.postcss.cssnano))
      .process(data, {
        from: `${input}/${file}`
      })
      .then(({ css }) => {
        writeFile(`${output}/${file}`, css, { encoding: 'utf8' });
      });
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

export default processCSS;
