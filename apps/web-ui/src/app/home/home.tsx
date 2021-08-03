import './home.module.scss';
import SplitRow from '../layout/split-row';
import { Add16 } from '@carbon/icons-react';
import { Button, ClickableTile, Modal, TextInput, Tile } from 'carbon-components-react';
import GridRow from '../layout/grid-row';
import { createRef, useContext, useEffect, useRef, useState } from 'react';
import DataContext from '../data/data';
import { ProjectEntry } from '@colorstream/web-data';
import { useHistory } from 'react-router-dom';

function CreateProjectModal(props: { open: boolean, onClose: () => void, onCreate: (value: string) => void }) {
  const input = createRef<HTMLInputElement>()

  return (
    <Modal
      open={props.open}
      onRequestClose={props.onClose}
      onRequestSubmit={() => props.onCreate(input.current?.value || 'no?')}
      modalHeading='Add a new project'
      modalLabel='New Project'
      primaryButtonText='Add'
      secondaryButtonText='Cancel'>
      <p style={{ marginBottom: '1rem' }}>
        Creating a new project, here's some text
      </p>
      <TextInput
        ref={input}
        data-modal-primary-focus
        id='text-input-1'
        labelText='Project Name'
        placeholder='The New Hotness'
        style={{ marginBottom: '1rem' }}
      />
    </Modal>
  );
}

export function HomeRootPage() {
  const [newProjectOpen, openNewProject] = useState(false);

  const data = useContext(DataContext);
  const [projects, setProjects] = useState<ProjectEntry[]>([]);

  useEffect(() => {
    data.get_projects().then((pros) => {
      console.log(pros);
      setProjects(pros);
    });
  }, [data]);

  const history = useHistory();

  return (
    <div>
      <GridRow style={{ paddingBottom: '2rem' }}>
        <h1>Welcome to home!</h1>
      </GridRow>

      <SplitRow style={{ paddingBottom: '1rem' }}>
        <h2>Projects</h2>
        <Button renderIcon={Add16} onClick={() => openNewProject(true)}>Add Project</Button>
      </SplitRow>

      <GridRow style={{ gap: '1rem' }}>
        {projects.map(project => (
          <ClickableTile title={project.name} handleClick={() => history.push(`/projects/${project.id}`)}>
            <div style={{ padding: '1rem' }}>
              {project.name}
            </div>
          </ClickableTile>))}
      </GridRow>

      <CreateProjectModal
        open={newProjectOpen}
        onCreate={(name) => {
          data.create_project({name}).then(project => history.push(`/projects/${project.id}`))
        }}
        onClose={() => openNewProject(false)}
      />
    </div>
  );
}

export default HomeRootPage;
