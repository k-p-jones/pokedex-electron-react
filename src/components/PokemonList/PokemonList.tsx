import React, { useEffect } from 'react';
import { Grid, Menu, Input, Container } from 'semantic-ui-react';
import Pokemon from '../../interfaces/Pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

interface Props {
  pokemon: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemon }) => {
  const list = pokemon.map(p => <PokemonCard pokemon={p} key={p.name} />);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Menu fixed="top" className="main-nav">
        <Menu.Item position="right">
          <Input icon='search' placeholder='Search for pokemon...' />
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
