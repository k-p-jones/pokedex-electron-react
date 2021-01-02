import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseStatsPage from './BaseStatsPage';

const pokemon = {
  id: 1,
  name: 'bulbasaur',
  speciesURL: 'https://pokeapi.co/api/v2/pokemon-species/1',
  dataURL: 'https://pokeapi.co/api/v2/pokemon/1',
  imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  data: {
    types: [],
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: "hp",
          url: "https://pokeapi.co/api/v2/stat/1/"
        }
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: "attack",
          url: "https://pokeapi.co/api/v2/stat/2/"
        }
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: "defense",
          url: "https://pokeapi.co/api/v2/stat/3/"
        }
      },
      {
        base_stat: 65,
        effort: 1,
        stat: {
          name: "special-attack",
          url: "https://pokeapi.co/api/v2/stat/4/"
        }
      },
      {
        base_stat: 65,
        effort: 0,
        stat: {
          name: "special-defense",
          url: "https://pokeapi.co/api/v2/stat/5/"
        }
      },
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: "speed",
          url: "https://pokeapi.co/api/v2/stat/6/"
        }
      }
    ]
  },
  color: 'green',
  evolutionChainURL: 'https://pokeapi.co/api/v2/evolution-chain/1',
  dataFetched: false,
  typeDataFetched: false,
  evolutionChainFetched: false
};

describe('when loading', () => {
  test('it displays the loading spinner', () => {
    render(<BaseStatsPage pokemon={pokemon} isLoading />);
    const spinnerText = screen.getByText('Loading...');
    const image = document.querySelector('img') as HTMLImageElement;
    expect(spinnerText).toBeInTheDocument();
    expect(image.src).toContain('pokeball.svg');
  });
});

describe('when not loading', () => {
  test('it displays the correct stats', () => {
    const { container } = render(<BaseStatsPage pokemon={pokemon} isLoading={false} />);
    pokemon.data.stats.forEach((stat) => {
      const text = container.querySelector(`[data-test-id="${stat.stat.name}"]`)?.textContent
      expect(text).toEqual(`${stat.stat.name}: ${stat.base_stat}`);
    })
  });
});
