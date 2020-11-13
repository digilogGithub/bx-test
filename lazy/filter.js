const log = console.log

L.filter = function* (f, iter) {
    for (const a of iter) {
        if (f(a))
            yield a;
    }
};

const it = L.filter(val => val % 2, [1, 2, 3, 4, 5, 6, 7, 8, 9])
log([...it])
