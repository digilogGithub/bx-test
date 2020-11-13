import {L, range} from './range';
import {curry, log, pTest, go, reduce, add} from '../basic'

const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === l) {
            return res;
        }
    }
    return res;
});


pTest('range', 1, () => go(range(10000),
    take(10),
    reduce(add),
    log)
);

pTest('L.range', 1, () => go(L.range(10000),
    take(10),
    reduce(add),
    log));
