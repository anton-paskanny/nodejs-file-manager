import { homedir } from 'os';
import { resolve, parse } from 'path';
import { chdir, cwd } from 'process';
import { stat } from 'node:fs/promises';
import { ERROR_OPERATION } from './constants.mjs'; 

export const setHomedir = () => {
    chdir(homedir());
};

export const getPathToItem = (item) => {
    return item ? resolve(cwd(), item) : false;
};

export const displayCurrDir = () => {
    console.log(`You are currently in ${cwd()}`);
}

export const parseArgs = () => {
    const args = process.argv.slice(2);
    const hashMap = {};

    args.forEach(item => {
        if (item.startsWith('--')) {
            const equalSign = item.match('=');
            const key = item.slice(2, equalSign?.index);
            const keyValue = item.slice(equalSign?.index + 1);

            hashMap[key] = keyValue;
        }
    });

    return hashMap;
};

export const getArgsKeys = (command) => {
    if (!command) return [];

    const args = command.split(' '); // ['os', '--version']
    
    return args.reduce((acc, item) => {
        if (item.startsWith('--') && item.length > 2) {
            acc.push(item.slice(2));
        };

        return acc;
    }, []);
}

export const getDestinations = (command) => {
    if (!command) return [];

    const arr = command.split(' ');

    const pathToFile = arr[1] ? resolve(cwd(), arr[1]) : null;
    const pathToDestination = arr[2] ? resolve(cwd(), arr[2]) : null; 
    
    return [ pathToFile, pathToDestination ];
}

export const isFile = async (path) => { 
    try {
        const stats = await stat(path);
        return stats.isFile();
    } catch {
        return false;
    }
}

export const isDirectory = async (path) => {  
    try {
        const stats = await stat(path);
        return stats.isDirectory();
    } catch {
        return false;
    }
}

export const displayErrMsg = (err) => {
    console.error(`${ERROR_OPERATION}: ${err?.message || "Something went wrong"}`);
}

export const checkFileExt = (pathToFile) => {
    if (!pathToFile) return false;

    const { ext } = parse(pathToFile);

    return (!ext || ext === '.') ? false : true;
}