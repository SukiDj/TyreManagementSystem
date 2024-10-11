import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tyre } from '../models/tyre';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';


function App() {
  const [tyres, setTyres] = useState<Tyre[]>([]);

  useEffect(() => {
    axios.get<Tyre[]>('http://localhost:5000/api/Tyre')
    .then(response => {
      setTyres(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
            <Outlet />
      </Container>
    </>
  );
}

export default App;
