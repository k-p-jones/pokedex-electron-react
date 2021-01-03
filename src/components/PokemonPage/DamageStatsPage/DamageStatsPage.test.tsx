import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DamageStatsPage from './DamageStatsPage';
import PokeAPI from '../../../data/PokeAPI';
import Pokemon from '../../../interfaces/Pokemon';

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
    types: [
      {
        name: 'poison',
        url: 'path/to/pokemon',
        data: {
          double_damage_from: [],
          double_damage_to: [],
          half_damage_from: [],
          half_damage_to: [],
          no_damage_from: [],
          no_damage_to: []
        }
      },
      {
        name: 'grass',
        url: 'path/to/pokemon',
        data: {
          double_damage_from: [],
          double_damage_to: [],
          half_damage_from: [],
          half_damage_to: [],
          no_damage_from: [],
          no_damage_to: []
        }
      }
    ],
    stats: []
  },
  color: 'green',
  evolutionChainURL: 'https://pokeapi.co/api/v2/evolution-chain/1',
  dataFetched: false,
  typeDataFetched: false,
  evolutionChainFetched: false
}

const poison = {
  double_damage_from: [
    {
      name: "ground",
      url: "https://pokeapi.co/api/v2/type/5/"
    },
    {
      name: "psychic",
      url: "https://pokeapi.co/api/v2/type/14/"
    }
  ],
  double_damage_to: [
    {
      name: "grass",
      url: "https://pokeapi.co/api/v2/type/12/"
    },
    {
      name: "fairy",
      url: "https://pokeapi.co/api/v2/type/18/"
    }
  ],
  half_damage_from: [
    {
      name: "fighting",
      url: "https://pokeapi.co/api/v2/type/2/"
    },
    {
      name: "poison",
      url: "https://pokeapi.co/api/v2/type/4/"
    },
    {
      name: "bug",
      url: "https://pokeapi.co/api/v2/type/7/"
    },
    {
      name: "grass",
      url: "https://pokeapi.co/api/v2/type/12/"
    },
    {
      name: "fairy",
      url: "https://pokeapi.co/api/v2/type/18/"
    }
  ],
  half_damage_to: [
    {
      name: "poison",
      url: "https://pokeapi.co/api/v2/type/4/"
    },
    {
      name: "ground",
      url: "https://pokeapi.co/api/v2/type/5/"
    },
    {
      name: "rock",
      url: "https://pokeapi.co/api/v2/type/6/"
    },
    {
      name: "ghost",
      url: "https://pokeapi.co/api/v2/type/8/"
    }
  ],
  no_damage_from: [],
  no_damage_to: [
    {
      name: "steel",
      url: "https://pokeapi.co/api/v2/type/9/"
    }
  ]
}

const grass = {
  double_damage_from: [
    {
      name: "flying",
      url: "https://pokeapi.co/api/v2/type/3/"
    },
    {
      name: "poison",
      url: "https://pokeapi.co/api/v2/type/4/"
    },
    {
      name: "bug",
      url: "https://pokeapi.co/api/v2/type/7/"
    },
    {
      name: "fire",
      url: "https://pokeapi.co/api/v2/type/10/"
    },
    {
      name: "ice",
      url: "https://pokeapi.co/api/v2/type/15/"
    }
  ],
  double_damage_to: [
    {
      name: "ground",
      url: "https://pokeapi.co/api/v2/type/5/"
    },
    {
      name: "rock",
      url: "https://pokeapi.co/api/v2/type/6/"
    },
    {
      name: "water",
      url: "https://pokeapi.co/api/v2/type/11/"
    }
  ],
  half_damage_from: [
    {
      name: "ground",
      url: "https://pokeapi.co/api/v2/type/5/"
    },
    {
      name: "water",
      url: "https://pokeapi.co/api/v2/type/11/"
    },
    {
      name: "grass",
      url: "https://pokeapi.co/api/v2/type/12/"
    },
    {
      name: "electric",
      url: "https://pokeapi.co/api/v2/type/13/"
    }
  ],
  half_damage_to: [
    {
      name: "flying",
      url: "https://pokeapi.co/api/v2/type/3/"
    },
    {
      name: "poison",
      url: "https://pokeapi.co/api/v2/type/4/"
    },
    {
      name: "bug",
      url: "https://pokeapi.co/api/v2/type/7/"
    },
    {
      name: "steel",
      url: "https://pokeapi.co/api/v2/type/9/"
    },
    {
      name: "fire",
      url: "https://pokeapi.co/api/v2/type/10/"
    },
    {
      name: "grass",
      url: "https://pokeapi.co/api/v2/type/12/"
    },
    {
      name: "dragon",
      url: "https://pokeapi.co/api/v2/type/16/"
    }
  ],
  no_damage_from: [],
  no_damage_to: []
}

const fetchTypeData = (p: Pokemon) => {
  const damageData = [poison, grass];
  return new Promise<void>((resolve) => {
    p.data.types.forEach((t: { data: object }, index: number) => t.data = damageData[index]);
    resolve();
  });
}

beforeEach(() => {
  PokeAPI.fetchTypeData = jest.fn((p) => fetchTypeData(p));
});

test('it displays the content', async () => {
  const { container } = render(<DamageStatsPage pokemon={pokemon} />);
  // Test the loading content displays
  const spinnerText = screen.getByText('Loading...');
  const image = document.querySelector('img') as HTMLImageElement;
  expect(spinnerText).toBeInTheDocument();
  expect(image.src).toContain('pokeball.svg');

  await waitFor(() => {
    // Test the stats display
    const heading = screen.getAllByText('Strong Attacking (2x Damage)')
    expect(heading.length).toEqual(2);
    expect(container).toMatchSnapshot();
  })
});
