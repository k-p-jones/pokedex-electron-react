import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import PokemonList from '../PokemonList/PokemonList';
import PokeAPI from '../../data/PokeAPI';
import Pokemon from '../../interfaces/Pokemon';

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    PokeAPI.fetchBasePokemon()
    .then((allPokemon) => setPokemon(allPokemon));
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" component={() => <PokemonList pokemon={pokemon} />} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App;
