import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import PokeAPI from '../../data/PokeAPI';

afterEach(() => {
  jest.resetAllMocks();
});

const pokemon = [
  {
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
  },
  {
    id: 2,
    name: 'ivysaur',
    speciesURL: 'https://pokeapi.co/api/v2/pokemon-species/1',
    dataURL: 'https://pokeapi.co/api/v2/pokemon/2',
    imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    data: {
      types: [],
      stats: []
    },
    color: 'green',
    evolutionChainURL: 'https://pokeapi.co/api/v2/evolution-chain/1',
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
]

describe('navigation', () => {
  beforeEach(() => {
    PokeAPI.fetchBasePokemon = jest.fn(() => Promise.resolve(pokemon));
    global.scrollTo = jest.fn();
  })

  test('user can navigate to individual pokemon pages', async () => {
    render(<App />);

    // Wait for the base pokemon to load:
    await waitFor(() => {
      const nameOne = screen.getByText('bulbasaur');
      const nameTwo = screen.getByText('ivysaur');
      const nameThree = screen.getByText('venusaur');
      expect(nameOne).toBeInTheDocument();
      expect(nameTwo).toBeInTheDocument();
      expect(nameThree).toBeInTheDocument();
    });

    const node = screen.getByText('ivysaur');

    fireEvent.click(
      node,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    // Check the PokemonPage has loaded
    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('Evolution')).toBeInTheDocument();
    expect(screen.getByText('Type Stats')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  })
})
