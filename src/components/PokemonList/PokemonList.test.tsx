import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonList from './PokemonList';

const pokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    speciesURL: 'https://pokeapi.co/api/v2/pokemon-species/1',
    dataURL: 'https://pokeapi.co/api/v2/pokemon/1',
    imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    evolutionChainURL: '',
    data: {
      types: [],
      stats: []
    },
    dataFetched: false,
    typeDataFetched: false,
    evolutionChainFetched: false
  },
  {
    id: 2,
    name: 'ivysaur',
    speciesURL: 'https://pokeapi.co/api/v2/pokemon-species/1',
    dataURL: 'https://pokeapi.co/api/v2/pokemon/2',
    imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    evolutionChainURL: '',
    data: {
      types: [],
      stats: []
    },
    dataFetched: false,
    typeDataFetched: false,
    evolutionChainFetched: false
  },
  {
    id: 3,
    name: 'venusaur',
    speciesURL: 'https://pokeapi.co/api/v2/pokemon-species/1',
    dataURL: 'https://pokeapi.co/api/v2/pokemon/3',
    imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    evolutionChainURL: '',
    data: {
      types: [],
      stats: []
    },
    dataFetched: false,
    typeDataFetched: false,
    evolutionChainFetched: false
  }
]

test('it displays the correct pokemon', () => {
  render(
    <MemoryRouter>
      <PokemonList pokemon={pokemon} />
    </MemoryRouter>
  );
  const nameOne = screen.getByText('bulbasaur');
  const nameTwo = screen.getByText('ivysaur');
  const nameThree = screen.getByText('venusaur');
  expect(nameOne).toBeInTheDocument();
  expect(nameTwo).toBeInTheDocument();
  expect(nameThree).toBeInTheDocument();
});

test('it filters the pokemon', () => {
  render(
    <MemoryRouter>
      <PokemonList pokemon={pokemon} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Search for pokemon...');
  fireEvent.change(input, { target: { value: 'ivy' } });

  const nameOne = screen.queryByText('bulbasaur');
  const nameTwo = screen.getByText('ivysaur');
  const nameThree = screen.queryByText('venusaur');

  expect(nameOne).toBeNull();
  expect(nameTwo).toBeInTheDocument();
  expect(nameThree).toBeNull();
});
