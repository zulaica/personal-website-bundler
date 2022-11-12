import { exit, stderr, stdout } from 'process';
import { cursorTo } from 'readline';
import { EMOJI } from './index.mjs';

export const logError = (error) => {
  stderr.write(`\n${EMOJI.noEntry} An error has occurred\n`);
  stderr.write(error.toString());
  exit(1);
};

export const logMessage = (message, update = false) => {
  if (update) {
    cursorTo(stdout, 0, null);
  }
  stdout.write(message);
};
