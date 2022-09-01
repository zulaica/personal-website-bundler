#!/usr/bin/env node

import { Command } from 'commander';
import { EMOJI } from './constants.mjs';
import copyAssets from './copyAssets.mjs';
import preflight from './preflight.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import processjs from './processjs.mjs';
import { reportError } from './shared.mjs';

(async () => {
  const program = new Command();

  program
    .version('0.3.0')
    .requiredOption('-i, --input <input>', 'The source directory')
    .requiredOption('-o, --output <output>', 'The output directory');

  program.parse();

  const { input, output } = program.opts();

  try {
    console.info(`${EMOJI.construction} Bundling release`);
    await preflight(output);
    await copyAssets();
    await processcss(input, output);
    await processjs(input, output);
    await processhtml(input, output);
    console.info(`${EMOJI.partyPopper} Release bundled successfully\n`);
  } catch (error) {
    reportError(error);
  }
})();
