#!/usr/bin/env node
import minimist from 'minimist';
import fs from 'fs';
import path from 'path';
import * as changeCase from 'change-case';
import {spongeCase} from 'sponge-case';

function load(file: string) {
    return fs.readFileSync(path.join(__dirname, file)).toString().split('\n');
}

function randomItem(items: string[]) {
    return items[Math.floor(Math.random() * items.length)];
}

const cases = {
    camel: changeCase.camelCase,
    capital: changeCase.capitalCase,
    constant: changeCase.constantCase,
    dot: changeCase.dotCase,
    header: changeCase.headerCase,
    no: changeCase.noCase,
    param: changeCase.paramCase,
    pascal: changeCase.pascalCase,
    path: changeCase.pathCase,
    sentence: changeCase.sentenceCase,
    sponge: spongeCase,
    snake: changeCase.snakeCase
};

const matchy = /\[(.*?)(?::(.*?))?\]/g;

(async () => {
    try {
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
            const out = _[0].replace(matchy, (box: string, name: string, change: string) => {
                const list = words[name];
                const caseChange = cases[change] || cases.no;
                if (change && !cases[change])
                    throw new Error(`':${change}' is not a valid case type`);
                if (!list) throw new Error(`'${box}' is not a known list`);
                return caseChange(randomItem(list));
            });
            items.push(out);
        }

        console.log(items.join('\n'));
    } catch (e) {
        console.error(e.message);
    }
})();
