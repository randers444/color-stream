import { ProjectEntry } from './schema';
import { nanoid } from 'nanoid';
import { DBOperation } from './operation';

export const create_project: DBOperation<Omit<ProjectEntry, 'id'>, ProjectEntry> =
  (db) => {
    return async (entry) => {
      const id = nanoid();
      const value = { ...entry, id };
      await db.add('project', value, id);
      return value;
    };
  };

export const get_project: DBOperation<string, ProjectEntry | undefined> =
  (db) => {
    return async (project_id) => {
      return await db.get('project', project_id);
    };
  };

export const get_projects: DBOperation<void, ProjectEntry[]> =
  (db) => {
    return async () => {
      return await db.getAll('project');
    };
  };
