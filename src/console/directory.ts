import kleur from 'kleur';
import { ScanneResult } from '../types/scanne';




export function consoleDir(direcotryScanned:ScanneResult):void{
    
    direcotryScanned.directory.forEach((item: ScanneResult) => {
        console.log(kleur.bgGreen(`*Directory: ${item.path}`));
        item.files.forEach((file: string) => {
            console.log(kleur.magenta(`  File: ${file}`));
        });
        item.directory.forEach((subItem: ScanneResult) => {
            console.log(kleur.yellow(`-> Subdirectory: ${subItem.path}`));
            consoleDir(subItem);
            subItem.files.forEach((subFile: string) => {
                console.log(kleur.magenta(`    ::File: ${subFile}`));
            });
        });
    });
};