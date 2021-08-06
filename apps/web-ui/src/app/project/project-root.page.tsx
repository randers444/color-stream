import { useParams } from 'react-router-dom';
import { Button } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import ColorPreview from './color-preview/color-preview.component';
import GridRow from '../layout/grid-row';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../data/data';
import { ColorEntry, DataSource, ProjectEntry } from '@colorstream/web-data';
import SplitRow from '../layout/split-row';
import CreateColorModal, { CreateColor } from './create-color-modal';
import { ProjectRootNotFound } from './project-root-not-found.page';
import { voidIt } from '../types.util';
import styles from './project-root.module.scss';

export function ProjectRootPage() {
  const { id } = useParams<{ id: string }>();

  const data = useContext(DataContext);

  const [newColorOpen, setNewColorOpen] = useState(false);
  const [toolOpen, setToolOpen] = useState(false);

  const [project, setProject] = useState<ProjectEntry | null>();
  const [colors, setColors] = useState<ColorEntry[]>();

  const families: Record<string, ColorEntry[]> = colors?.reduce((memo, next) => {
    (memo[next.family] = memo[next.family] || []).push(next);
    return memo;
  }, {} as Record<string, ColorEntry[]>) || {};

  useEffect(() => voidIt(fetchAndSetData(data, id)), [id, data]);


  async function fetchAndSetData(data: DataSource, id: string) {
    await data.get_project(id).then(project => setProject(project || null));
    await data.get_colors_project(id).then(setColors);
  }

  async function createColor(data: DataSource, project: ProjectEntry, family: string, init: CreateColor) {
    await data.create_color({
      project: project.id,
      family: family,
      snapshot_value: init.color,
      name: init.name,
    });

    setNewColorOpen(false);
    await fetchAndSetData(data, project.id);
  }

  if (project == null) {
    return <ProjectRootNotFound id={id} />;
  }

  if (!project || !colors) {
    return <h1>Loading</h1>;
  }

  return (
    <div className={[styles.ProjectRoot, toolOpen ? styles.ToolOpen : ''].join(' ')}>
      <div className={styles.Content}>
        <SplitRow style={{ paddingBottom: '2rem' }}>
          <h1>{project.name}</h1>
          <Button renderIcon={Add16}>Add Family</Button>
        </SplitRow>

        {Object.entries(families).map(([family, colors]) => {
          return (
            <div key={family}>
              <SplitRow style={{ paddingBottom: '1rem' }}>
                <h2>{family}</h2>
                <Button renderIcon={Add16} onClick={() => setNewColorOpen(true)}>Add Color</Button>
                <CreateColorModal open={newColorOpen}
                                  onClose={() => setNewColorOpen(false)}
                                  onCreate={(init) => createColor(data, project, family, init)} />
              </SplitRow>
              <GridRow style={{ gap: '1rem' }}>
                {colors.map(color => {
                  return (<ColorPreview color={color} key={color.id} onClick={() => setToolOpen(true)} />);
                })}
              </GridRow>
            </div>
          );
        })}
      </div>
      <div className={styles.Tool}>
        tool
      </div>
    </div>
  );
}

export default ProjectRootPage;
