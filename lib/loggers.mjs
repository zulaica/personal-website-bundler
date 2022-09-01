import { exit, stderr, stdout } from 'process';
import { EMOJI } from './constants.mjs';

export const logError = (error) => {
  stderr.write(`${EMOJI.noEntry} An error has occurred`);
  stderr.write(error);
  exit(1);
};

export const logMessage = (message, update = false) => {
  if (update) {
    stdout.clearLine(0);
    stdout.cursorTo(0);
  }
  stdout.write(message);
};
