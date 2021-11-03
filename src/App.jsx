import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          type: res.data.types[0].type.name,
        });
        setPokemonChosen(true);
      });
  };

  return (
    <div className="App">
      <div className="pokeTitle">
        <h1>Pokédex</h1>
        <input 
        placeholder="Give me a name!"
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          value={pokemonName.toLowerCase()}
        />
        <div>
          {pokemonName && (
            <button onClick={searchPokemon}>Pokemon is comming</button>
          )}
        </div>
      </div>
      <div className="pokeContainer">
          <div className="pokeCard">
        {!pokemonChosen ? (
          <h1> Please choose a Pokémon </h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>Number: #{pokemon.number}</h2>
            <h2>Species: {pokemon.species}</h2>
            <h2>Type: {pokemon.type}</h2>
            <h2>Hp: {pokemon.hp}</h2>
            <h2>Attack: {pokemon.attack}</h2>
            <h2>Defense: {pokemon.defense}</h2>
            <h2>Speed: {pokemon.speed}</h2>
          </>
        )}
        </div>
      </div>
    </div>
  );
};
export default App;