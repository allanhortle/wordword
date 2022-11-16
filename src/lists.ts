import fs from 'fs';
import path from 'path';

export const wordLists = [
    'adjective-buzzword',
    'adjective',
    'adverb-buzzword',
    'adverb',
    'animal',
    'article',
    'color',
    'conjunction',
    'determiner',
    'interjection',
    'noun-buzzword',
    'noun',
    'number-cardinal',
    'preposition',
    'pronoun',
    'verb-buzzword',
    'verb'
] as const;

function isWordList(key: string): key is typeof wordLists[number] {
    return !!wordLists.find((w) => key === w);
}

export default function lists(name: string) {
    if (!isWordList(name)) throw new Error(`${name} is not a word list`);
    return fs
        .readFileSync(path.join(__dirname, '../lists', `${name}.txt`))
        .toString()
        .split('\n');
}
