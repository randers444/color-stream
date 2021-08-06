import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from 'react';

export type setFn<S> = Dispatch<SetStateAction<S>>;

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
export function voidIt(inArg: any): void {
}

export type FnComponent = ReactElement
