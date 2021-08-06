import { ColorEntry } from './schema';
import { nanoid } from 'nanoid';
import { DBOperation } from './operation';

export const create_color: DBOperation<Omit<ColorEntry, 'id'>, ColorEntry> =
  (db) => {
    return async (entry) => {
      const id = nanoid();
      const value = { ...entry, id };
      await db.add('color', value, id);
      return value;
    };
  };

export const get_colors_project: DBOperation<string, ColorEntry[]> =
  (db) => {
    return async (project_id) => {
      return await db.getAllFromIndex('color', 'by-project', project_id);
    };
  };
