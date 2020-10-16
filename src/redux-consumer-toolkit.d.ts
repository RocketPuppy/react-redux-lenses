declare module 'redux-consumer-toolkit' {
  type Fn<A, B> = (a: A) => B;
  export type Consumer<Static, In, Out> = (i: In, s: Static) => Out;

  export interface ApplicativeI<Static, In, Out> {
    of(o: Out): Consumer<Static, In, Out>;
    constant(o: Out): Consumer<Static, In, Out>;
  }

  type Apify<Static, In, T> = { [P in keyof T]: Consumer<Static, In, T[P]> };
  export interface ApplyI<Static, In, OutA, OutB> {
    ap(
      f: Consumer<Static, In, Fn<OutA, OutB>>,
      r: Consumer<Static, In, OutA>,
    ): Consumer<Static, In, OutB>;
    apAll<F extends (...r: any[]) => never>(
      fn: Consumer<Static, In, Fn<Parameters<F>, OutB>>,
      ...rs: Apify<Static, In, Parameters<F>>
    ): Consumer<Static, In, OutB>
  };

  type Speccify<
    S extends { [k: string]: (...args: any[]) => any}
  > = { [K in keyof S]: ReturnType<S[K]> };

  export interface ChainI<Static, In, OutA, OutB> {
    bind(
      b: (o: OutA) => Consumer<Static, In, OutB>,
      r: Consumer<Static, In, OutA>
    ): Consumer<Static, In, OutB>;
    chain(
      ra: Consumer<Static, In, OutA>,
      rb: (o: OutA) => Consumer<Static, In, OutB>
    ): Consumer<Static, In, OutB>
    expand(
      ea: Consumer<Static, In, OutA>,
      eb: Consumer<Static, In, OutB>,
    ): Consumer<Static, In, OutA & OutB>;

    expandAll<O extends {}, A extends (keyof O)[]>(
      ...rs: Apify<Static, In, A>
    ): Consumer<Static, In, O>;

    combine<Spec extends { [k: string]: Consumer<Static, In, any> }>(spec: Spec): Consumer<Static, In, Speccify<Spec>>;
  };

  export interface FunctorI<Static, In, OutA, OutB> {
    map(
      f: Fn<OutA, OutB>,
      c: Consumer<Static, In, OutA>
    ): Consumer<Static, In, OutB>;
  };

  export interface MonoidI<Static, State> {
    empty(): Consumer<Static, State, State>;
    identity: Consumer<Static, State, State>;
  };

  type Objectified<K extends string, O> = Record<K, O>;
  export interface ProfunctorI<Static, InA, InB, OutA, OutB> {
    promap(
      fi: Fn<InB, InA>,
      fo: Fn<OutA, OutB>,
      r: Consumer<Static, Ina, OutA>
    ): Consumer<Static, InB, OutB>;
    mapInOut(
      fi: Fn<InB, InA>,
      fo: Fn<OutA, OutB>,
      r: Consumer<Static, Ina, OutA>
    ): Consumer<Static, InB, OutB>;
    mapIn(f: Fn<InB, InA>, r: Consumer<Static, InA, OutA>): Consumer<Static, InB, OutA>;
    mapOut(f: Fn<OutA, OutB>, r: Consumer<Static, InA, OutA>): Consumer<Static, InA, OutB>;

    objectify<K extends string>(
      s: K,
      r: Consumer<Static, InA, OutA>
    ): Consumer<Static, Objectified<K, InA>, Objectified<K, OutA>>;
  };

  type Concatted<A extends Array<Consumer<any, any, any>>> = ReturnType<GetLast<A>>
  export interface SemigroupI<Static, In, OutA, OutB> {
    concat(
      ra: Consumer<Static, In, OutA>,
      rb: Consumer<Static, OutA, OutB>
    ): Consumer<Static, In, OutB>;
    concatAll<Arg extends Array<Consumer<Static, In, any>>>(...rs: Arg): Consumer<Static, In, Concatted<Arg>>;
  };

  export const map: FunctorI.map;
  export const apAll: ApplyI.apAll;
  export const constant: ApplicativeI.constant;
  export const mapInOut: ProfunctorI.mapInOut;
  export const mapIn: ProfunctorI.mapIn;
  export const objectify: ProfunctorI.objectify;
  export const chain: ChainI.chain;
  export const expandAll: ChainI.expandAll;
  export const combine: ChainI.combine;
  export const identity: MonoidI.identity;
  export const concatAll: SemigroupI.concatAll;
  export const Monoid: MonoidI;
  export const Semigroup: SemigroupI;
  export const Chain: ChainI;
  export const Functor: FunctorI;
  export const Profunctor: ProfunctorI;
  export const Apply: ApplyI;
  export const Applicative: ApplicativeI;
}
