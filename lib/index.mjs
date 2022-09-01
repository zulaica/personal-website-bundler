#!/usr/bin/env node

import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { extname } from 'path';
import posthtml from 'posthtml';
import { EMOJI } from './constants.mjs';
import copyAssets from './copyAssets.mjs';
import { logError, logMessage } from './loggers.mjs';
import preflight from './preflight.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import processjs from './processjs.mjs';

(async () => {
  const program = new Command();
  program
    .version('0.3.0')
    .requiredOption('-i, --input <input>', 'The source directory')
    .requiredOption('-o, --output <output>', 'The output directory')
    .parse();

  const { input, output } = program.opts();
  const files = { html: 'index.html', scripts: 'scripts', styles: 'styles' };
  const data = await readFile(`${input}/index.html`, { encoding: 'utf8' });
  posthtml()
    .process(data)
    .then(({ tree }) => {
      tree.match(
        [{ tag: 'script' }, { tag: 'link', attrs: { rel: 'stylesheet' } }],
        (node) => {
          if (node.attrs?.src || node.attrs?.href) {
            const file = node.attrs.src ?? node.attrs.href;
            const extension = extname(file).slice(1);
            files[extension] = file;
          }
        }
      );
    });

  try {
    logMessage(`${EMOJI.construction} Bundling release\n`);
    await preflight(output);
    await copyAssets(input, output, files);
    await processcss(input, output, files.css);
    await processjs(input, output, files.js);
    await processhtml(input, output, files.html);
    logMessage(`${EMOJI.package} Finished!`);
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n\n');
  }
})();
