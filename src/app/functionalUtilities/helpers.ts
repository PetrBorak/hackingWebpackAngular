import { curry } from 'ramda'

export const chain = curry((fn, m) => m.chain(fn));
export const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
export const map = curry((fn, f) => f.map(fn));
