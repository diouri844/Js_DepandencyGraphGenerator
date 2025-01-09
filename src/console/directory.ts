import kleur from 'kleur';



function displayDirectoryStructur(files:any) {
    for (const [dir, file] of Object.entries(files)) {
            if (Array.isArray(file)) {
                console.log(kleur.green(dir));
                for (const f of file) {
                    console.log(kleur.blue(`  - ${f}`));
                }
            } else {
                console.log(kleur.green(dir));
                for (const [subDir, subFiles] of Object.entries(file as { [key: string]: string[] })) {
                    console.log(kleur.green(`  - ${subDir}`));
                    if (Array.isArray(subFiles)) {
                        for (const f of subFiles) {
                            console.log(kleur.blue(`    - ${f}`));
                        }
                    } else {
                        console.log(kleur.blue(`    - ${subFiles}`));
                    }
                }
            }
    }
}

export { displayDirectoryStructur };