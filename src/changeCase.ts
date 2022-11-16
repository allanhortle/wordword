import * as change from 'change-case';
import {spongeCase} from 'sponge-case';

const cases = {
    camel: change.camelCase,
    capital: change.capitalCase,
    constant: change.constantCase,
    dot: change.dotCase,
    header: change.headerCase,
    no: change.noCase,
    param: change.paramCase,
    pascal: change.pascalCase,
    path: change.pathCase,
    sentence: change.sentenceCase,
    sponge: spongeCase,
    snake: change.snakeCase,
    nothing: (x: string) => x
};

export const caseTypes = Object.keys(cases);

function isValidCase(value: string): value is keyof typeof cases {
    return value in cases;
}

export default function changeCase(input: string, caseType: string = 'nothing') {
    if (!isValidCase(caseType)) throw new Error(`${caseType} is not a valid case`);
    return cases[caseType](input);
}
