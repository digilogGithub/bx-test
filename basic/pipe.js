import {go} from './go.js';

export const pipe = (fn, ...fns) => a => go(fn(a), ...fns)
