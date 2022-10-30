import { userInfo, homedir, cpus, EOL, arch } from 'os';
import { getArgsKeys } from '../utils/helpers.mjs';
import { ERROR_OPERATION } from '../utils/constants.mjs';

export const handleOs = (command) => {
    const param = getArgsKeys(command);
    
    switch (param[0]) {
        case ('EOL'): {
            console.log(EOL);
            break;
        }
        case('architecture'): {
            console.log(arch());
            break;
        }
        case ('username'): {
            const { username } = userInfo();
            console.log(username);
            break;
        }
        case ('homedir'): {
            console.log(homedir());
            break;
        }
        case ('cpus'): {
            const systemCpuCores = cpus();
            console.log('----------------');
            console.log('Overall amount of cpu: ', systemCpuCores.length);
            console.log('----------------');
            systemCpuCores.forEach((cpu, index) => {
                console.log(`#${index + 1}: ${cpu.model}`);
                console.log('----------------');
            })
            break;
        }
        default: {
            console.error(ERROR_OPERATION);
        }
    }
};