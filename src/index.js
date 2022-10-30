import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';
import { parseArgs } from './utils/helpers.mjs';
import { handleCommandLine } from './utils/lineHandler.mjs';
import { setHomedir, displayCurrDir } from './utils/helpers.mjs';

export const startFileManager = async () => {
    const hashMap = parseArgs();
    const username = hashMap['username'] || 'anonymous';
    const rI = readline.createInterface({ input,output });

    // Starting working directory is current user's home directory
    setHomedir();
    
    console.log(`Welcome to the File Manager, ${username}!\n`);
    
    displayCurrDir();

    rI.on('line', line => handleCommandLine(line, rI))
    .on('SIGINT', () => rI.close())
    .on('close', () => {
        console.log(`Thank you for using File Manager, ${username}!`);
        rI.removeAllListeners();
        setTimeout(() => exit(0), 100);
    });
};

startFileManager();