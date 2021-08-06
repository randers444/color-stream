import { DB } from './schema';

export type Operation<In, Out> = ((inArg: In) => Promise<Out>);

export type DBOperation<In, Out> = (db: DB) => Operation<In, Out>;
