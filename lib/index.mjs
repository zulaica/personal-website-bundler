#!/usr/bin/env node

import { EMOJI } from './constants.mjs';
import copyAssets from './copyAssets.mjs';
import preflight from './preflight.mjs';
import processcss from './processcss.mjs';
import processhtml from './processhtml.mjs';
import processjs from './processjs.mjs';
import { reportError } from './shared.mjs';

(async () => {
  console.info(`${EMOJI.construction} Bundling release`);

  try {
    await preflight();
    await copyAssets();
    await processcss();
    await processjs();
    await processhtml();
    console.info(`${EMOJI.partyPopper} Release bundled successfully\n`);
  } catch (error) {
    reportError(error);
  }
})();
