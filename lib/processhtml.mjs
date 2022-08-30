import { readFile, writeFile } from 'fs/promises';
import htmlnano from 'htmlnano';
import posthtml from 'posthtml';
import { hash } from 'posthtml-hash';
import { EMOJI, OPTIONS } from './constants.mjs';
import { reportError } from './shared.mjs';

const processhtml = async (input, output) => {
  console.info(`${EMOJI.fileCabinet} Processing HTML`);
  try {
    const data = await readFile(`${input}/index.html`, { encoding: 'utf8' });
    await posthtml()
      .use(htmlnano(OPTIONS.posthtml.htmlnano, htmlnano.presets.safe))
      .use(hash({ path: output, pattern: new RegExp(/hash/) }))
      .process(data)
      .then(({ html }) => {
        writeFile(`${output}/index.html`, html, { encoding: 'utf8' });
      });
  } catch (error) {
    reportError(error);
  }
};

export default processhtml;
