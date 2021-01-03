import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const pokemon = {
  id: 1,
  name: 'bulbasaur',
  speciesURL: 'https://pokeapi.co/api/v2/pokemon-species/1',
  dataURL: 'https://pokeapi.co/api/v2/pokemon/1',
  imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  data: {
    types: [],
    stats: []
  },
  color: 'green',
  evolutionChainURL: 'https://pokeapi.co/api/v2/evolution-chain/1',
  dataFetched: false,
  typeDataFetched: false,
  evolutionChainFetched: false
}

test('it renders correctly', () => {
  const { container } = render(
    <MemoryRouter>
      <PokemonCard pokemon={pokemon} />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
})
