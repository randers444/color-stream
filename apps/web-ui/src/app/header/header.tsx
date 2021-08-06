import './header.module.scss';
import {
  Header,
  HeaderContainer,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem
} from 'carbon-components-react';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../data/data';
import { ProjectEntry } from '@colorstream/web-data';
import { Link } from 'react-router-dom';

export function AppHeader() {

  const data = useContext(DataContext);
  const [projects, setProjects] = useState<ProjectEntry[]>([]);

  useEffect(() => {
    data.get_projects().then((pros) => {
      setProjects(pros);
    });
  }, [data]);

  return (
    <HeaderContainer render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label='colorstream'>
        <HeaderMenuButton
          aria-label='Open menu'
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        { /*@ts-ignore - something about the element isn't working*/ }
        <HeaderName prefix='color' element={Link} to={`/`}>
          [stream]
        </HeaderName>
        <HeaderNavigation aria-label='Projects'>
          <HeaderMenu aria-label='Projects' menuLinkName='Projects'>
            {projects.map(project =>
              // @ts-ignore - something about the element isn't working
              (<HeaderMenuItem key={project.id} element={Link} to={`/projects/${project.id}`}>{project.name}</HeaderMenuItem>))}
            <HeaderMenuItem>Create Project +</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <SideNav aria-label='Side navigation' expanded={isSideNavExpanded} isPersistent={false}>
          <SideNavItems>
            <SideNavMenu title='Projects' defaultExpanded={true}>
              {projects.map(project =>
                // @ts-ignore
                (<SideNavMenuItem key={project.id} element={Link} to={`/projects/${project.id}`}>{project.name}</SideNavMenuItem>))}
            </SideNavMenu>
          </SideNavItems>
        </SideNav>
      </Header>
    )}
    />
  );
}

export default AppHeader;
