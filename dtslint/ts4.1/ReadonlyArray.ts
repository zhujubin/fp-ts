import * as _ from '../../src/ReadonlyArray'
import { pipe } from '../../src/function'
import * as N from '../../src/number'
import { Ord } from '../../src/Ord'

declare const rus: ReadonlyArray<unknown>
declare const rns: ReadonlyArray<number>
declare const rss: ReadonlyArray<string>
declare const rtns: ReadonlyArray<readonly [number, string]>

//
// zip
//

pipe(rns, _.zip(rss)) // $ExpectType readonly (readonly [number, string])[]

//
// zipWith
//

// $ExpectType readonly (readonly [number, string])[]
pipe(
  rns,
  _.zipWith(rss, (n, s) => [n, s] as const)
)

//
// unzip
//

_.unzip(rtns) // $ExpectType readonly [readonly number[], readonly string[]]
pipe(rtns, _.unzip) // $ExpectType readonly [readonly number[], readonly string[]]

//
// filter
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filter((u: unknown): u is number => typeof u === 'number')
)

//
// filterWithIndex
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filterWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// partition
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partition((u: unknown): u is number => typeof u === 'number')
)

//
// partitionWithIndex
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partitionWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// spanLeft
//

// $ExpectType Spanned<number, unknown>
pipe(
  rus,
  _.spanLeft((u: unknown): u is number => typeof u === 'number')
)

//
// lookup
//

_.lookup(0) // $ExpectType <A>(as: readonly A[]) => Option<A>

//
// elem
//

pipe([1, 2, 3], _.elem(N.Eq)(1)) // $ExpectType boolean

//
// difference
//

pipe([1, 2], _.difference(N.Eq)([3, 4])) // $ExpectType readonly number[]

//
// intersection
//

pipe([1, 2], _.intersection(N.Eq)([3, 4])) // $ExpectType readonly number[]

//
// union
//

pipe([1, 2], _.union(N.Eq)([3, 4])) // $ExpectType readonly number[]

//
// zip
//

pipe([1, 2], _.zip(['a', 'b'])) // $ExpectType readonly (readonly [number, string])[]

//
// cons
//

_.cons(0) // $ExpectType (tail: readonly number[]) => ReadonlyNonEmptyArray<number>

//
// sort
//

declare const ord1: Ord<{ readonly a: string }>
interface X1 {
  readonly a: string
  readonly b: number
}
declare const x1s: ReadonlyArray<X1>

_.sort(ord1)(x1s) // $ExpectType ReadonlyArray<X1>
pipe(x1s, _.sort(ord1)) // $ExpectType ReadonlyArray<X1>

//
// sortBy
//

declare const ord2: Ord<X1>
declare const ord3: Ord<X1>
interface X2 {
  readonly a: string
  readonly b: number
  readonly c: boolean
}
declare const x2s: ReadonlyArray<X2>

_.sortBy([ord2, ord3])(x2s) // $ExpectType ReadonlyArray<X2>
pipe(x2s, _.sortBy([ord2, ord3])) // $ExpectType ReadonlyArray<X2>

//
// Do
//

// $ExpectType readonly { a: number; b: string; }[]
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)

//
// scanLeft
//

// $ExpectType ReadonlyNonEmptyArray<number>
pipe(
  [],
  _.scanLeft(1, () => 2)
)

//
// scanRight
//

// $ExpectType ReadonlyNonEmptyArray<number>
pipe(
  [],
  _.scanRight(1, () => 2)
)
