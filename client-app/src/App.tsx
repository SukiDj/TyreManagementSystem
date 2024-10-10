import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';


function App() {
  const [, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data)
    })
  }, [])

  return (
    <Header as='h1' content='Tyre Management System' />
  )
}

export default App
