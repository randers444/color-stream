import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Observable } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';
import { nanoid } from 'nanoid';

export function webData(): string {
  return 'web-data';
}

interface DBStore<T> {
  key: string;
  value: T;
}

interface ColorDB extends DBSchema {
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

export class DataSource {
  _db$ = new Observable<DB>(sub => {
    this.initDb().then((it: DB) => sub.next(it));
  }).pipe(shareReplay(1));

  constructor() {
    console.log(
      'ds constructor'
    );
    //
    // this.getDb().then(async () => {
    //   const project = await this.create_project({ name: 'Test Project 1' });
    //   await this.create_color({project: project.id, snapshot_value:'red', family:'default'});
    //   await this.create_color({project: project.id, snapshot_value:'blue', family:'default'});
    // });

  }

  async create_color(entry: Omit<ColorEntry, 'id'>) {
    const db = await this.getDb();
    const id = nanoid();
    const value = { ...entry, id };
    await db.add('color', value, id);
    return value;
  }

  async get_colors_project(project_id: string): Promise<ColorEntry[]> {
    const db = await this.getDb();
    return await db.getAllFromIndex('color', 'by-project', project_id);
  }

  async get_projects(): Promise<ProjectEntry[]> {
    const db = await this.getDb();
    return db.getAll('project');
  }

  async get_project(project_id: string): Promise<ProjectEntry | undefined> {
    const db = await this.getDb();
    return await db.get('project', project_id);
  }

  async create_project(entry: Omit<ProjectEntry, 'id'>) {
    const db = await this.getDb();
    // const id = '1';
    const id = nanoid();
    const value = { ...entry, id };
    await db.add('project', value, id);
    return value;
  }

  private getDb(): Promise<DB> {
    return this._db$.pipe(first()).toPromise() as Promise<DB>;
    // return firstValueFrom(this._db$);
  }

  private async initDb(): Promise<IDBPDatabase<ColorDB>> {
    console.log('init db');
    // await deleteDB('color-stream-web');
    const db = await openDB<ColorDB>('color-stream-web', 1, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          const color_store = db.createObjectStore('color');
          color_store.createIndex('by-project', 'project');

          db.createObjectStore('project');
        }
      }
    });
    return db;
  }
}
