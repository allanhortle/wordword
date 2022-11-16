#!/usr/bin/env node
import {program} from 'commander';
import namename from './index';
import {wordLists} from './lists';
import {caseTypes} from './changeCase';

try {
    program
        .name('\n\n  wordword')
        .usage('[options] [template-string]')
        .description(
            `Examples:
  wordword "release/[adjective]-[animal]"
  wordword "[adjective:snake]_[animal:snake]"
  wordword "[buzzword-adverb] [buzzword-adjective] [animal]"
  wordword "release/[adjective:sponge]-[animal:sponge]"

Lists:
  ${wordLists.join('\n  ')}

Case Types:
  ${caseTypes.join('\n  ')}
`
        )
        .option('-n, --number [number]', 'number of random strings to generate', '1');
    program.parse();

    const {number} = program.opts();

    const items = [];
    for (let i = 0; i < number; i++) {
        const out = namename(program.args[0]);
        items.push(out);
    }

    console.log(items.join('\n'));
} catch (e: any) {
    console.error(e.message);
}
