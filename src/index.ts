#!/usr/bin/env node
import minimist from 'minimist';
import fs from 'fs';
import path from 'path';

function load(file: string) {
    return fs.readFileSync(path.join(__dirname, file)).toString().split('\n');
}

function randomItem(items: string[]) {
    return items[Math.floor(Math.random() * items.length)];
}

(async () => {
    const words = {
        adjective: load('../lists/adjective.txt'),
        animal: load('../lists/animal.txt'),
        'buzzword-noun': load('../lists/buzzword-noun.txt'),
        'buzzword-verb': load('../lists/buzzword-verb.txt'),
        'buzzword-adjective': load('../lists/buzzword-adjective.txt'),
        'buzzword-adverb': load('../lists/buzzword-adverb.txt')
    };

    const {_, n = 1} = minimist(process.argv.slice(2));
    const items = [];
    for (let i = 0; i < n; i++) {
        const out = _[0].replace(/\[(.*?)\]/g, (box: string, name: string) => {
            const list = words[name];
            if (!list) throw new Error(`${box} is not a known list`);
            return randomItem(list);
        });
        items.push(out);
    }

    console.log(items.join('\n'));
})();
