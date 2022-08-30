import cssnanoPlugin from 'cssnano';
import { readFile, writeFile } from 'fs/promises';
import postcss from 'postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import url from 'postcss-url';
import { EMOJI, OPTIONS } from './constants.mjs';
import { reportError } from './shared.mjs';

const processcss = async (input, output) => {
  console.info(`${EMOJI.artistPalette} Processing styles`);
  try {
    const data = await readFile(`${input}/style.hash.css`, {
      encoding: 'utf8'
    });
    await postcss()
      .use(atImport())
      .use(postcssPresetEnv())
      .use(url(OPTIONS.postcss.url))
      .use(cssnanoPlugin(OPTIONS.postcss.cssnano))
      .process(data, {
        from: `${input}/style.hash.css`
      })
      .then(({ css }) => {
        writeFile(`${output}/style.hash.css`, css, { encoding: 'utf8' });
      });
  } catch (error) {
    reportError(error);
  }
};

export default processcss;
