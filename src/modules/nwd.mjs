import { readdir } from 'node:fs/promises';
import { chdir, cwd } from 'process';
import { join } from 'path';
import { displayCurrDir, displayErrMsg } from '../utils/helpers.mjs';

export const handleLs = async () => {
    const currentPath = cwd();

    try {
        const filesToCopy = await readdir(currentPath);
        console.log(`Reading content of ${currentPath} folder: `);
        console.log('-----------------------');
        for (const file of filesToCopy) { 
            console.log(file);
        };
        console.log('-----------------------');
    }
    catch (err) { displayErrMsg(err); }

    displayCurrDir();
}

export const handleUp = () => {
    try {
        chdir('..');
        displayCurrDir();
    }
    catch (err) { displayErrMsg(err); }
}

export const handleCd = (command) => {
    try {
        const pathToGo = command.trim().split(' ')[1];
        const finalPath = join(cwd(), pathToGo);
    
        chdir(finalPath);
        displayCurrDir();
    }
    catch (err) { displayErrMsg(err); }
}