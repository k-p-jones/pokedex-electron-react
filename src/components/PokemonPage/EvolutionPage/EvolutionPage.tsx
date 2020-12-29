import React, { useCallback, useEffect, useState } from 'react';
import { Loader, Image } from 'semantic-ui-react';
import PokeAPI from '../../../data/PokeAPI';
import BasicObject from '../../../interfaces/BasicObject';
import Pokemon from '../../../interfaces/Pokemon';

interface Props {
  pokemon: Pokemon;
}

const EvolutionPage: React.FC<Props> = ({ pokemon }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [urls, setUrls] = useState<string[]>([]);

  const getData: Function = useCallback((obj: { species: BasicObject, evolves_to: { species: BasicObject, evolves_to: any }[] }, arr: Array<string>) => {
    const id = parseInt(obj.species.url.split('/').reverse()[1]);
    // Some parts of the evolution chain appear to have been added after Gen 1

    if (id <= 150) {
      const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      arr.push(url)
    }

    if (obj.evolves_to.length === 0) { return arr }

    return getData(obj.evolves_to[0], arr);
  }, []);

  const getChainData: any = useCallback((chain: any) => {
    const arr: Array<string> = [];
    const result = getData(chain, arr);
    return result;
  }, [getData]);

  useEffect(() => {
    PokeAPI.fetchEvolutionChain(pokemon).then(() => {
      const chain = getChainData(pokemon.data.evolutionChain);
      setUrls(chain);
      setIsLoading(false);
    });
  }, [pokemon, pokemon.evolutionChainFetched, getChainData])

  const pageContent = () => {
    return urls.map(url => <Image src={url} key={url}/>)
  }

  if (isLoading) { return <Loader /> }

  return (
    <div>{pageContent()}</div>
  );
}

export default EvolutionPage;
