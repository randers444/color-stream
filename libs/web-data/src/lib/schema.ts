import { DBSchema, IDBPDatabase } from 'idb';

interface DBStore<T> {
  key: string;
  value: T;
}

export interface ColorDB extends DBSchema {
  color: DBStore<ColorEntry> & { indexes: { 'by-project': string }; }
  project: DBStore<ProjectEntry>
}

export interface Identified {
  id: string;
}

export interface ColorEntry extends Identified {
  name: string;
  snapshot_value: string;
  project: string;
  family: string;
  variant?: string;
}

export interface ProjectEntry extends Identified {
  name: string;
}

export type DB = IDBPDatabase<ColorDB>;
