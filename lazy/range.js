import {log, curry, map, go, reduce, add} from '../basic/index.js'
import {pTest} from "../basic";

export const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i)
    }
    return res;
};

// let list = range(4)
// console.log('range list',list)

export const L = {};
L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        yield i
    }
};

// list = L.range(4);
// log(list)
// log(list.next());
// log(list.next());
// log(list.next());
// log(list.next());
// log(reduce(add, list))

// const test = (name, time, f) => {
//     console.time(name);
//     while(time--) f();
//     console.timeEnd(name);
// };

// pTest('range', 10, () => reduce(add, range(1000000)))
// pTest('range', 10, () => reduce(add, L.range(1000000)))
