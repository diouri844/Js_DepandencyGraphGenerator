

import process from "process";

import { scanDirectory } from "./scanner/directory";
import { displayDirectoryStructur } from "./console/directory";
import { ScanneResult } from "./types/scanne";

// tryin to render all js file in the directory : 



async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error('Usage: node main.js <directory>');
        process.exit(1);
    }
    const directory = args[0];
    try {
        const files:ScanneResult[] = await scanDirectory(directory);
        console.log(files[0]);
        // for (let file of files ){
        //     if(file.type === "directory"){
        //     const subfiles = file.files;
        //     console.log("D- ",file.name," : ",subfiles.files);
        //     }
        //     else{
        //         console.log("F- ",file);
        //     }
        // }
        //displayDirectoryStructur(files);
    } catch (error) {
        console.error('Error scanning directory:', error);
    }
}

main();






