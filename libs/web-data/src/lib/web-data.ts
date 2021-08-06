import { openDB } from 'idb';
import { Observable } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';
import { ColorDB, DB } from './schema';
import { create_color, get_colors_project } from './color.operations';
import { DBOperation, Operation } from './operation';
import { create_project, get_project, get_projects } from './project.operations';


export class DataSource {
  // Operations
  public readonly create_color = this.install(create_color);
  public readonly get_colors_project = this.install(get_colors_project);
  public readonly get_projects = this.install(get_projects);
  public readonly get_project = this.install(get_project);
  public readonly create_project = this.install(create_project);
  private _db$: Observable<DB>;

  constructor() {
    this._db$ = new Observable<DB>(
      sub => {
        this.initDb().then((it: DB) => sub.next(it));
      })
      .pipe(shareReplay(1));
  }

  private install<In, Out>(operation: DBOperation<In, Out>): Operation<In, Out> {
    return (async inArg => operation(await this.getDb())(inArg));
  }

  private getDb(): Promise<DB> {
    return this._db$.pipe(first()).toPromise() as Promise<DB>;
    // return firstValueFrom(this._db$);
  }

  // noinspection JSMethodCanBeStatic
  private async initDb(): Promise<DB> {
    return await openDB<ColorDB>('color-stream-web', 1, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          const color_store = db.createObjectStore('color');
          color_store.createIndex('by-project', 'project');

          db.createObjectStore('project');
        }
      }
    });
  }
}
