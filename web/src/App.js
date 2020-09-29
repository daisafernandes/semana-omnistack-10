import React, {useEffect, useState} from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import api from './services/api';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const response = await api.post('/devs', { data });
    console.log(response.data);   
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
       <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit}/>
       </aside>
       <main>
         <ul>
           {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
           ))}           
         </ul>
       </main>
    </div>
  );
}

export default App;
