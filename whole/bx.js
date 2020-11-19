const products = [
    {name: '반팔티', price: 15000, quantity: 1, is_selected: true},
    {name: '긴팔티', price: 20000, quantity: 2, is_selected: false},
    {name: '핸드폰케이', price: 15000, quantity: 3, is_selected: true},
    {name: '후드티', price: 30000, quantity: 4, is_selected: false},
    {name: '바지', price: 25000, quantity: 5, is_selected: false},
];

const log = console.log;
const curry = f => (a, ...args) => args.length ? f(a, ...args) : (...args) => f(a, ...args);
const add = curry((a, b) => a + b);
const nop = Symbol('nop');
const noop = () => {
};
const catchNoop = ([...arr]) => (arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const reduce1 = (f, acc, a) => a instanceof Promise ? a.then(a => f(acc, a), e => e === nop ? acc : Promise.reject(e))
    : f(acc, a);

const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]()
    return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            if (a instanceof Promise) {
                return a.then(a => (res.push(a), res).length === l ? res : recur())
                    .catch(e => e === nop ? recur() : Promise.reject(e));
            }
            res.push(a);
            if (res.length === l) {
                return res;
            }
        }
        return res;
    }();
});
const takeAll = take(Infinity);
const takeHead = iter => go1(take(1, iter), ([val]) => val);
const cTake = curry((l, iter) => take(l, catchNoop(iter)));

const reduce = curry((f, acc, iter) => {
    if (!iter) return reduce(f, takeHead(iter = acc[Symbol.iterator]()), iter);

    iter = iter[Symbol.iterator]();
    return go1(acc, function recur(acc) {
        let cur;
        while (!(cur = iter.next()).done) {
            acc = reduce1(f, acc, cur.value);
            if (acc instanceof Promise)
                return acc.then(recur);
        }
        return acc;
    });
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);

const lMap = curry(function* (f, iter) {
    for (const a of iter) {
        yield go1(a, f);
    }
});

const lFilter = curry(function* (f, iter) {
    for (const a of iter) {
        const b = go1(a, f)
        if (b instanceof Promise) {
            yield b.then(b => b ? a : Promise.reject(nop));
        } else {
            if (b) yield a;
        }
    }
});


const map = curry(pipe(lMap, takeAll))

const filter = curry(pipe(lFilter, takeAll))

const cTakeAll = cTake(Infinity);

const pMap = curry(pipe(lMap, cTakeAll))
const pFilter = curry(pipe(lFilter, cTakeAll))

const cReduce = curry((f, acc, iter) => {
    return iter ? reduce(f, acc, catchNoop(iter)) : reduce(f, catchNoop(acc))
});

/*go(Promise.resolve(1),
    a => a + 10,
    a => Promise.resolve(a + 100),
    a => a + 1000,
    a => a + 10000,
    log).catch(a => log(a))*/

/*
go(
    // [2,3, 4],
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    lMap(a => Promise.resolve(a + 10)),
    // lMap(a => Promise.resolve(a + 10)),
    // take(2),
    takeAll,
    log)

go(
    // [2,3, 4],
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    lMap(a => Promise.resolve(a + 10)),
    filter(a => a < 12),
    // lMap(a => Promise.resolve(a + 10)),
    // take(2),
    // takeAll,
    log)

go([1, 2, 3, 4],
    lMap(a => Promise.resolve(a * a)),
    filter(a => Promise.resolve(a % 2)),
    lMap(a => {
        log(a);
        return a * a
    }),
    take(4),
    log);
*/


/*go([1, 2, 3, 4, 5],
    lMap(a => Promise.resolve(a * a)),
    lFilter(a => Promise.resolve(a % 2)),
    reduce(add),
    log);


go([1, 2, 3, 4, 5, 6, 7, 8],
    lMap(a => {
        log(a);
        return new Promise(resolve => setTimeout(() => resolve(a * a), 1000))
    }),
    lFilter(a => {
        log(a);
        return new Promise(resolve => setTimeout(() => resolve(a % 2), 1000))
    }),
    takeAll,
    log);*/

const delay500 = (a, name = 'test') => new Promise(resolve => {
    log(name, a)
    setTimeout(() => resolve(a), 500)
});

/*go([1, 2, 3, 4, 5],
    lMap(a => delay500(a * a)),
    lFilter(a => delay500(a % 2)),
    lMap(a => delay500(a * a)),
    cTake(2),
    cReduce(add),
    log);


pMap(a => delay500(a * a, 'pmap'), [1,2,3,4]).then(log);
pFilter(a => delay500(a % 2, 'pfilter'), [1,2,3,4]).then(log);*/

go([1, 2, 3, 4, 5, 6, 7, 8],
    map(a => delay500(a * a, 'map 1')),
    filter(a => delay500(a % 2, 'filter 1')),
    map(a => delay500(a * a, 'map 2')),
    take(2),
    log);

go([1, 2, 3, 4, 5, 6, 7, 8],
    lMap(a => delay500(a * a, 'lmap 1')),
    lFilter(a => delay500(a % 2, 'lfilter 1')),
    lMap(a => delay500(a * a, 'map 2')),
    take(2),
    log);

/*// whole data set : eqp, raw id
const eqp = ['a', 'b', 'c'];
const rawId = [2, 1, 3];

// selected data set
const target = ['a', 'c'];

// mapping list
const mapList = new Map();
target.forEach(val => mapList[val]=rawId[eqp.indexOf(val)]);

console.log('show mapList', mapList)*/
