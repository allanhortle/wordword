import fs from 'fs';
import path from 'path';

const words = {
    adjective: '../lists/adjective.txt',
    animal: '../lists/animal.txt',
    color: '../lists/color.txt',
    'buzzword-noun': '../lists/buzzword-noun.txt',
    'buzzword-verb': '../lists/buzzword-verb.txt',
    'buzzword-adjective': '../lists/buzzword-adjective.txt',
    'buzzword-adverb': '../lists/buzzword-adverb.txt'
};

export const wordLists = Object.keys(words);

function isWordList(key: string): key is keyof typeof words {
    return Object.keys(words).includes(key);
}

export default function lists(name: string) {
    if (!isWordList(name)) throw new Error(`${name} is not a word list`);
    return fs.readFileSync(path.join(__dirname, words[name])).toString().split('\n');
}
