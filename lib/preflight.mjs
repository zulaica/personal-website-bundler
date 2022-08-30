import { mkdir, readdir, rm } from 'fs/promises';
import { EMOJI } from './constants.mjs';
import { reportError } from './shared.mjs';

const preflight = async (output) => {
  console.info(`${EMOJI.airplaneDeparture} Preflight`);

  try {
    const files = await readdir(output);
    console.info(`${EMOJI.litterInBinSign} Removing old release files`);
    for (const file of files) {
      await rm(`${output}/${file}`, { recursive: true, force: true });
      console.info(`   ${EMOJI.wastebasket} ${file}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.info(`${EMOJI.fileFolder} Creating release directory`);
      await mkdir(output);
    } else {
      reportError(error);
    }
  }
};

export default preflight;
