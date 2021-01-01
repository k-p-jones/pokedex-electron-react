import React, { useState } from 'react';
import { Grid, Menu, Input, Container } from 'semantic-ui-react';
import Pokemon from '../../interfaces/Pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

interface Props {
  pokemon: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemon }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const pokemonToDisplay = () => {
    if (searchTerm === '') { return pokemon }
    return pokemon.filter((p: Pokemon) => p.name.includes(searchTerm));
  }

  const list = pokemonToDisplay().map((p: Pokemon) => <PokemonCard pokemon={p} key={p.name} />);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  return (
    <div>
      <Menu fixed="top" className="main-nav">
        <Menu.Item position="right">
          <Input
            icon='search'
            placeholder='Search for pokemon...'
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Menu.Item>
      </Menu>
      <Container className="pokemon-list-container">
        <Grid columns={2}>
          <Grid.Row>
            {list}
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default PokemonList;
