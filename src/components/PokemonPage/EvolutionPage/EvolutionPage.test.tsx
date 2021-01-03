import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PokeAPI from '../../../data/PokeAPI';
import EvolutionPage from './EvolutionPage';

afterEach(() => {
  jest.resetAllMocks();
});

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

const chain = {
  evolution_details: [],
  evolves_to: [
    {
      evolution_details: [
        {
          gender: null,
          held_item: null,
          item: null,
          known_move: null,
          known_move_type: null,
          location: null,
          min_affection: null,
          min_beauty: null,
          min_happiness: null,
          min_level: 32,
          needs_overworld_rain: false,
          party_species: null,
          party_type: null,
          relative_physical_stats: null,
          time_of_day: "",
          trade_species: null,
          trigger: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/evolution-trigger/1/"
          },
          turn_upside_down: false
        }
      ],
      evolves_to: [
        {
          evolution_details: [
            {
              gender: null,
              held_item: null,
              item: null,
              known_move: null,
              known_move_type: null,
              location: null,
              min_affection: null,
              min_beauty: null,
              min_happiness: null,
              min_level: 32,
              needs_overworld_rain: false,
              party_species: null,
              party_type: null,
              relative_physical_stats: null,
              time_of_day: "",
              trade_species: null,
              trigger: {
                name: "level-up",
                url: "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              turn_upside_down: false
            }
          ],
          evolves_to: [],
          is_baby: false,
          species: {
            name: "venusaur",
            url: "https://pokeapi.co/api/v2/pokemon-species/3/"
          }
        }
      ],
      is_baby: false,
      species: {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/2/"
      }
    }
  ],
  is_baby: false,
  species: {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/1/"
  }
}

const mockFetchEvolutionChain = (p: any) => {
  return new Promise<void>((resolve) => {
    p.data.evolutionChain = chain;
    resolve();
  });    
};

beforeEach(() => {
  PokeAPI.fetchEvolutionChain = jest.fn((p) => mockFetchEvolutionChain(p))
});

test('it displays the correct images and names', () => {
  render(<EvolutionPage pokemon={pokemon} />)

  waitFor(() => {
    const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
    const images = document.querySelectorAll('img');
    expect(images.length === 3).toBeTruthy();

    images.forEach((image, index) => {
      expect(image.src).toEqual(`${baseURL}${index + 1}.png`);
    });

    ['bulbasaur', 'ivysaur', 'venusaur'].forEach((name) => {
      const displayedName = screen.getByText(name);
      expect(displayedName).toBeInTheDocument();
    });
  });
});
