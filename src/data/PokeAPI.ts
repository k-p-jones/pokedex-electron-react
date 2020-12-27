import axios from 'axios';
import BaseApiResponse from '../interfaces/BaseApiResponse';
import SpeciesApiResponse from '../interfaces/SpeciesApiResponse';
import Pokemon from '../interfaces/Pokemon';
import COLORS from '../consts/colors';

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
              imageURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
            }
            pokemon.push(obj);
          });
        }).then(async () => {
          await Promise.all(
            pokemon.map(async (p: Pokemon) => {
              const response = await axios.get(p.speciesURL);
              const data: SpeciesApiResponse = response.data;
              p.color = COLORS[data.color.name];
            })
          );
          return resolve(pokemon);
        })
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new PokeAPI();
