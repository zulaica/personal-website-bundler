import { readFile, writeFile } from 'fs/promises';
import htmlnano from 'htmlnano';
import posthtml from 'posthtml';
import { hash } from 'posthtml-hash';
import { EMOJI, OPTIONS, logError, logMessage } from '../helpers/index.mjs';

const processHTML = async (input, output, file) => {
  logMessage(`${EMOJI.fileCabinet} Processing HTML`);

  try {
    const data = await readFile(`${input}/${file}`, { encoding: 'utf8' });
    const { html } = await posthtml()
      .use(htmlnano(OPTIONS.posthtml.htmlnano, htmlnano.presets.safe))
      .use(hash({ path: output, pattern: new RegExp(/hash/) }))
      .process(data);
    await writeFile(`${output}/${file}`, html, { encoding: 'utf8' });
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

export default processHTML;
