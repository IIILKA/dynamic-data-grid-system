import { nameOf } from './NameOfHelper';

export function resetObject(obj: any): any {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.keys(obj).reduce((acc, curr) => {
        if (obj[curr] === null) return { ...acc, [curr]: null };
        if (typeof obj[curr] === 'undefined') return { ...acc, [curr]: undefined };
        if (typeof obj[curr] === 'boolean') return { ...acc, [curr]: false };
        if (typeof obj[curr] === 'string') return { ...acc, [curr]: '' };
        if (typeof obj[curr] === 'number') return { ...acc, [curr]: 0 };
        if (obj[curr] instanceof Array) return { ...acc, [curr]: [] };
        if (typeof obj[curr] === 'object') return { ...acc, [curr]: {} };
    }, {});
}
