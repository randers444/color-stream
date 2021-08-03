import { DataSource } from '@colorstream/web-data';
import { createContext } from 'react';

const DataContext = createContext<DataSource>({} as DataSource);

export default DataContext;

