import { Button, Content } from 'carbon-components-react';
import AppHeader from './header/header';
import DataContext from './data/data';
import { DataSource } from '@colorstream/web-data';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectRootPage from './project/project-root.page';

import styles from './app.module.scss';
import HomeRootPage from './home/home';

export function App() {

  return (
    <DataContext.Provider value={new DataSource()}>
      <Router>
        <AppHeader />
        <Content>
          <Switch>
            <Route path="/projects/:id">
              <ProjectRootPage/>
            </Route>

            <Route path="/about">
              <p className={styles.app}>text</p>
              <Button >It's a about</Button>
            </Route>

            <Route path="/">
              <HomeRootPage/>
            </Route>
          </Switch>

        </Content>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
