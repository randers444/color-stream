import { useHistory, useParams } from 'react-router-dom';
import { Button, Link } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import ColorPreview from './color-preview/color-preview.component';
import GridRow from '../layout/grid-row';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../data/data';
import { ColorEntry, ProjectEntry } from '@colorstream/web-data';
import SplitRow from '../layout/split-row';
import CreateColorModal from './create-color-modal';

export function ProjectRootPage() {
  const { id } = useParams<{ id: string }>();

  const data = useContext(DataContext);

  const [newColorOpen, setNewColorOpen] = useState(false);

  const history = useHistory();

  const [project, setProject] = useState<ProjectEntry | null>();
  const [colors, setColors] = useState<ColorEntry[]>();

  const families: Record<string, ColorEntry[]> = colors?.reduce((memo, next) => {
    (memo[next.family] = memo[next.family] || []).push(next);
    return memo;
  }, {} as Record<string, ColorEntry[]>) || {};

  useEffect(() => {
    data.get_project(id).then(project => setProject(project || null));
    data.get_colors_project(id).then(setColors);
  }, [id, data]);

  if (project == null) {
    return <div>
      <h1 style={{ paddingBottom: '1rem' }}>No Project here :(</h1>
      <h4 style={{ paddingBottom: '1rem' }}>There's no project with id: <strong>{id}</strong> </h4>


      <Link onClick={() => history.push('/')}>
        Go back Home
      </Link>
    </div>;
  }

  if (!project || !colors) {
    return <h1>Loading</h1>;
  }

  return (
    <>
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
                                onCreate={(init) => {
                                  data.create_color({
                                    project: project.id,
                                    family: family,
                                    snapshot_value: init.color,
                                    name: init.name
                                  })
                                    .then(() => {
                                      setNewColorOpen(false);
                                    });
                                }} />
            </SplitRow>
            <GridRow style={{ gap: '1rem' }}>
              {colors.map(color => {
                return (<ColorPreview color={color} key={color.id} />);
              })}
              {colors.map(color => {
                return (<ColorPreview color={color} key={color.id} />);
              })}
              {colors.map(color => {
                return (<ColorPreview color={color} key={color.id} />);
              })}
            </GridRow>
          </div>
        );
      })}
    </>
  );
}

export default ProjectRootPage;
