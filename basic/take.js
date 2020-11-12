import {curry} from './curry.js'

export const take = curry((l, iter) => {
    let i = -1;
    let res = [];
    while (++i <= l) {
        const val = iter[Symbol.iterator]().next().value;
        res.push(val);
    }
    return res;
});
