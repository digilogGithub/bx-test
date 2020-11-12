
const log = console.log;
const curry = f => (a, ...args) => args.length ? f(a, ...args) : (...args) => f(a, ...args);
const take = curry((l, iter) => {
    let i = -1;
    let res = [];
    while (++i <= l) {
        const val = iter[Symbol.iterator]().next().value;
        res.push(val);
    }
    return res;
});
const filter = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) {
            res.push(a)
        }
    }
    return res;
});
const map = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a))
    }
    return res;
});
const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
});
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (fn, ...fns) => a => go(fn(a), ...fns)
