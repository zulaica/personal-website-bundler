import { readFile, writeFile } from 'fs/promises';
import htmlnano from 'htmlnano';
import posthtml from 'posthtml';
import { hash } from 'posthtml-hash';
import { EMOJI, OPTIONS, logError, logMessage } from '../helpers/index.mjs';

const processHTML = async ({ inputDir, outputDir }) => {
  logMessage(`${EMOJI.fileCabinet} Processing HTML`);
  const file = 'index.html';
  const input = `${inputDir}/${file}`;
  const output = `${outputDir}/${file}`;

  try {
    const data = await readFile(input, { encoding: 'utf8' });
    const code = await _processData(outputDir, data);
    await writeFile(output, code);
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

async function _processData(outputDir, data) {
  const { html } = await posthtml()
    .use(htmlnano(OPTIONS.posthtml.htmlnano, htmlnano.presets.safe))
    .use(hash({ path: outputDir, pattern: new RegExp(/hash/) }))
    .process(data);

  return html;
}

export default processHTML;
