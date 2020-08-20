import React, {useState, useEffect} from 'react';
//styles
import './styles.css';

function DevForm({ onSubmit }) {
  //constantes/estados/UseState's
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //chamado quando executado o componente/launch ou quando a variavel alterar(so se tiver entre [])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 60000,
      }
    );
  }, []);

  async function handleSubmit(e){
    // prevenir o efeito predefenido do form/submit que da refresh na pagina
    e.preventDefault();

    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude,
    });

    // limpar o valor do usuario do github
    setGithubUsername('');
    // limpar o valor das technologias
    setTechs('');

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Github Username</label>
        <input
          value={github_username}
          name="github_username"
          onChange={(e) => setGithubUsername(e.target.value)}
          id="github_username"
          required
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          value={techs}
          name="techs"
          id="techs"
          onChange={(e) => setTechs(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={latitude}
            id="latitude"
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={longitude}
            id="longitude"
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};


export default DevForm;