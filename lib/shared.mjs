import { EMOJI } from './constants.mjs';

export const reportError = (error) => {
  console.info(`${EMOJI.noEntry} An error has occurred`);
  console.error(error);
  console.log();
  process.exit(1);
};
