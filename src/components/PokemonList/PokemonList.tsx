import React from 'react';
import { Grid, Menu, Input, Container } from 'semantic-ui-react';
import Pokemon from '../../interfaces/Pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

interface Props {
  pokemon: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemon }) => {
  const list = pokemon.map(p => <PokemonCard pokemon={p} key={p.name} />);

  return (
    <div>
      <Menu fixed="top" className="main-nav">
        <Menu.Item position="right">
          <Input icon='search' placeholder='Search for pokemon...' />
        </Menu.Item>
      </Menu>
      <div style={{ marginTop: 100 }}>
        <Container>
          <Grid columns={3}>
            <Grid.Row>
              {list}
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default PokemonList;
