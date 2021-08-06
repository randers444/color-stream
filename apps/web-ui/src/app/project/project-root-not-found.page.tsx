import { Link } from 'carbon-components-react';
import { useHistory } from 'react-router-dom';

export function ProjectRootNotFound(props: { id: string }) {
  const history = useHistory();

  return <div>
    <h1 style={{ paddingBottom: '1rem' }}>No Project here :(</h1>
    <h4 style={{ paddingBottom: '1rem' }}>There's no project with id: <strong>{props.id}</strong></h4>


    <Link onClick={() => history.push('/')}>
      Go back Home
    </Link>
  </div>;
}
