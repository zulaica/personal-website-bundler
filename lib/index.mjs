#!/usr/bin/env node

import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { extname } from 'path';
import posthtml from 'posthtml';
import { version } from '../package.json';
import { EMOJI, logError, logMessage } from './helpers/index.mjs';
import {
  copyAssets,
  preflight,
  processCSS,
  processHTML,
  processJS
} from './modules/index.mjs';

(async () => {
  const program = new Command();
  program
    .version(version)
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
    logMessage(`${EMOJI.constructionWorker} Site Bundler v${version}\n`);
    logMessage(`${EMOJI.construction} Bundling release\n`);
    await preflight(output);
    await copyAssets(input, output, files);
    await processCSS(input, output, files.css);
    await processJS(input, output, files.js);
    await processHTML(input, output, files.html);
    logMessage(`${EMOJI.package} Finished!`);
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n\n');
  }
})();
