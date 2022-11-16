import lists from './lists';
import changeCase from './changeCase';

function randomItem(items: string[]) {
    return items[Math.floor(Math.random() * items.length)];
}

export default function namename(input: string) {
    const regex = /\[(.*?)(?::(.*?))?\]/g;
    return input.replace(regex, (_: string, name: string, change: string) => {
        const list = lists(name);
        return changeCase(randomItem(list), change);
    });
}
