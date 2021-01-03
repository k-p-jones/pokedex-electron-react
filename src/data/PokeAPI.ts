import axios from 'axios';
import BaseApiResponse from '../interfaces/BaseApiResponse';
import SpeciesApiResponse from '../interfaces/SpeciesApiResponse';
import Pokemon from '../interfaces/Pokemon';
import COLORS from '../consts/colors';
import PokemonBaseType from '../interfaces/PokemonBaseType';

class PokeAPI {
  fetchBasePokemon = () => {
    const pokemon: Array<Pokemon> = [];

    return new Promise<Pokemon[]>((resolve, reject) => {
      try {
        axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=150').then((response) => {
          response.data.results.forEach((data: BaseApiResponse, index: number) => {
            const obj: Pokemon = {
              id: index + 1,
              name: data.name,
              speciesURL: data.url,
              dataURL: `https://pokeapi.co/api/v2/pokemon/${index + 1}`,
              imageURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
              evolutionChainURL: '',
              data: {
                types: [],
                stats: []
              },
              dataFetched: false,
              typeDataFetched: false,
              evolutionChainFetched: false
            }
            pokemon.push(obj);
          });
        }).then(async () => {
          await Promise.all(
            pokemon.map(async (p: Pokemon) => {
              const response = await axios.get(p.speciesURL);
              const data: SpeciesApiResponse = response.data;
              p.color = COLORS[data.color.name];
              p.evolutionChainURL = data.evolution_chain.url;
            })
          );
          return resolve(pokemon);
        })
      } catch (error) {
        reject(error);
      }
    });
  }

  fetchPokemonData = (pokemon: Pokemon) => {
    return new Promise<void>(async (resolve) => {
      if (pokemon.dataFetched) { resolve() }
      const response = await axios.get(pokemon.dataURL);
      const types = response.data.types.map((t: PokemonBaseType) => {
        return t.type;
      });
      pokemon.data.types = types;
      pokemon.data.stats = response.data.stats;
      pokemon.dataFetched = true;
      resolve();
    })
  }

  fetchTypeData = (pokemon: Pokemon) => {
    return new Promise<void>(async (resolve) => {
      if (pokemon.typeDataFetched) { return resolve() }
      await Promise.all(
        pokemon.data.types.map(async (type, index) => {
          const response = await axios.get(type.url);
          pokemon.data.types[index].data = response.data.damage_relations;
        })
      );
      pokemon.typeDataFetched = true;
      resolve();
    });
  }

  fetchEvolutionChain = (pokemon: Pokemon) => {
    return new Promise<void>(async (resolve) => {
      if (pokemon.evolutionChainFetched) { return resolve() }
      const response = await axios.get(pokemon.evolutionChainURL)
      pokemon.data.evolutionChain = response.data.chain;
      pokemon.evolutionChainFetched = true;
      resolve();
    });
  }
}

export default new PokeAPI();
