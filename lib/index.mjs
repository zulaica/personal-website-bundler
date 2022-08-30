#!/usr/bin/env node

import { Command } from 'commander';
import { EMOJI } from './constants.mjs';
import preflight from './preflight.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import processjs from './processjs.mjs';
import { reportError } from './shared.mjs';

(async () => {
  const program = new Command();

  program
    .version('0.1.0')
    .requiredOption('-i, --input <input>', 'The source directory')
    .requiredOption('-o, --output <output>', 'The output directory');

  program.parse();

  try {
    console.info(`${EMOJI.construction} Building release`);
    await preflight();
    await processcss();
    await processjs();
    await processhtml();
    console.info(`${EMOJI.partyPopper} Release built successfully\n`);
  } catch (error) {
    reportError(error);
  }
})();
