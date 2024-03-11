#!/usr/bin/env node

import { program } from 'commander';
import { readFile } from 'fs/promises';
import { EMOJI, logError, logMessage } from './helpers/index.mjs';
import {
  copyAssets,
  preflight,
  processCSS,
  processHTML,
  processJS
} from './modules/index.mjs';

(async () => {
  const { version } = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url))
  );
  program
    .version(version)
    .requiredOption('-i, --input <input>', 'The source directory')
    .requiredOption('-o, --output <output>', 'The output directory')
    .parse();
  const { input, output } = program.opts();

  try {
    logMessage(`${EMOJI.constructionWorker} Site Bundler v${version}\n\n`);
    logMessage(`${EMOJI.construction} Bundling release\n`);
    await preflight(output);
    await copyAssets(input, output);
    await processCSS(input, output);
    await processJS(input, output);
    await processHTML(input, output);
    logMessage(`${EMOJI.package} Finished!`);
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n\n');
  }
})();
