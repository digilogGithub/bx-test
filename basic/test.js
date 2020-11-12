import {curry} from './curry.js';
import {map} from './map.js';
import {filter} from './filter.js';
import {take} from './take.js';
import {reduce} from './reduce.js';
import {go} from './go.js'
import {pipe} from './pipe.js'

const log = console.log;
const products =
    [
        {name: '반팔티', price: 15000},
        {name: '긴팔티', price: 20000},
        {name: '핸드폰케이', price: 15000},
        {name: '후드티', price: 30000},
        {name: '바지', price: 25000},
    ]

const add = curry((a, b) => a + b);

const total_price = pipe(map(p => p.price),
    reduce(add))

const base_total_price = predi => pipe(
    filter(predi),
    total_price
)

go(products,
    filter(p => p.price < 20000),
    // map(p => p.price),
    // reduce(add),
    total_price,
    log)

go(products,
    filter(p => p.price >= 20000),
    // map(p => p.price),
    // reduce(add),
    total_price,
    log)

go(products,
    base_total_price(p => p.price >= 20000),
    log)
