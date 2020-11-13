const log = console.log;
const products =
    [
        {name: '반팔티', price: 15000},
        {name: '긴팔티', price: 20000},
        {name: '핸드폰케이', price: 15000},
        {name: '후드티', price: 30000},
        {name: '바지', price: 25000},
    ]
const curry = f => (a, ...args) => args.length ? f(a, ...args) : (...args) => f(a, ...args);

const add = curry((a, b) => a + b);

const take = curry((l, iter) => {
    let i = -1;
    iter = iter[Symbol.iterator]();
    let res = [];
    while (++i < l) {
        const a = iter.next();
        if (!a.done)
            res.push(a.value)
        else
            break;
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

const filter = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) {
            res.push(a)
        }
    }
    return res;
});

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
        return reduce(f, acc, iter);
    }
    for (const a of iter) {
        acc = f(acc, a)
    }
    return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);
log(map(v => v.price, products))
log(filter(v => v.price >= 20000, products))
log(take(2, filter(v => v.price >= 20000, products)))
log(reduce(add, map(v => v.price)(products)))
go(products, filter(v => v.price < 20000), map(v => v.price), reduce(add), log)
const t_20000 = pipe(filter(v => v.price < 20000), map(v => v.price), reduce(add), log)
t_20000(products)
