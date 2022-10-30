import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { ERROR_WRONG_PATH, ERROR_STREAM_HANDLING } from '../utils/constants.mjs';
import { getDestinations, displayCurrDir, displayErrMsg, isFile } from '../utils/helpers.mjs';

export const calculateHash = async (line) => {
    try {
        const pathToFile = getDestinations(line)[0];

        if (!(await isFile(pathToFile))) { throw new Error(ERROR_WRONG_PATH); }
  
        const rS = createReadStream(pathToFile);
        
        const hash = createHash('sha256');

        rS.on("error", () => { throw new Error(ERROR_STREAM_HANDLING); });
        rS.on("data", chunk => hash.update(chunk));
        rS.on("end", () => {
            console.log('Hash: ', hash.digest("hex"));
            displayCurrDir();
        });

    }
    catch (err) { displayErrMsg(err); }
}