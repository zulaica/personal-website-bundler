import { readFile, writeFile } from 'fs/promises';
import htmlnano from 'htmlnano';
import posthtml from 'posthtml';
import { hash } from 'posthtml-hash';
import { EMOJI, OPTIONS, logError, logMessage } from '../helpers/index.mjs';

const processHTML = async ({ inputDir, outputDir }) => {
  logMessage(`${EMOJI.fileCabinet} Processing HTML`);
  const file = 'index.html';

  try {
    const data = await readFile(`${inputDir}/${file}`, { encoding: 'utf8' });
    const { html } = await posthtml()
      .use(htmlnano(OPTIONS.posthtml.htmlnano, htmlnano.presets.safe))
      .use(hash({ path: outputDir, pattern: new RegExp(/hash/) }))
      .process(data);
    await writeFile(`${outputDir}/${file}`, html);
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

export default processHTML;
