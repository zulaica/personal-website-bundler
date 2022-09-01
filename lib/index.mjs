#!/usr/bin/env node

import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { extname } from 'path';
import posthtml from 'posthtml';
import { EMOJI } from './constants.mjs';
import copyAssets from './copyAssets.mjs';
import preflight from './preflight.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import processjs from './processjs.mjs';
import { reportError } from './shared.mjs';

const files = {};

const plugin = () => {
  return (tree) => {
    tree.match(
      [{ tag: 'script' }, { tag: 'link', attrs: { rel: 'stylesheet' } }],
      (node) => {
        if (node.attrs?.src || node.attrs?.href) {
          const file = node.attrs.src ?? node.attrs.href;
          const extension = extname(file).slice(1);
          files[extension] = file;
        }

        return;
      }
    );
  };
};

(async () => {
  const program = new Command();

  program
    .version('0.3.0')
    .requiredOption('-i, --input <input>', 'The source directory')
    .requiredOption('-o, --output <output>', 'The output directory');

  program.parse();

  const { input, output } = program.opts();
  const data = await readFile(`${input}/index.html`, { encoding: 'utf8' });
  posthtml().use(plugin()).process(data);

  try {
    console.info(`${EMOJI.construction} Bundling release`);
    await preflight(output);
    await copyAssets(input, output);
    await processcss(input, output, files);
    await processjs(input, output, files);
    await processhtml(input, output);
    console.info(`${EMOJI.partyPopper} Release bundled successfully\n`);
  } catch (error) {
    reportError(error);
  }
})();
