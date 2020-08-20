// importar React, Estado, Efeito
import React, { useState, useEffect } from 'react';
// importar Css's
import "./global.css"; 
import "./App.css"; 
import "./SideBar.css"; 
import "./Main.css"; 
// import api
import api from './services/api';
//componentes
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

  // TODO add edit, delete list item . use other route ? Maybe or change Component?
function App() {
  
  const [devs, setDevs] = useState([]);
  
  //chamado quando executado o componente/launch ou quando a variavel alterar(so se tiver entre [])
  useEffect(()=> {
    // funcao para carregar a lista dos desemvolvedores da db
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    // chamar a funcao 
    loadDevs();
  }, []);

  // funcao asyncrona para fazer post/gravar informacao do dev
  async function handleAddDev(data){
    // chamada da api
    const response = await api.post('/devs', data);
 
    // juntar junto do fim do vector a resposta de modo que adicione na lista
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
