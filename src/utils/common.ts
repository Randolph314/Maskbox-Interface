export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function tenify(num: number) {
  return Math.abs(num) > 9 ? num : `0${num}`;
}

export type DeferTuple<T extends any = any, E extends unknown = unknown> = [
  Promise<T>,
  (value: T | PromiseLike<T>) => void,
  (reason?: E) => void,
];

export function createDefer<T extends any = any, E extends unknown = unknown>(): DeferTuple<T, E> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: E) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return [promise, resolve!, reject!];
}
