import React, { useCallback, useEffect, useState } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import PokeAPI from '../../../data/PokeAPI';
import BasicObject from '../../../interfaces/BasicObject';
import Pokemon from '../../../interfaces/Pokemon';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import './EvolutionPage.css';

interface Props {
  pokemon: Pokemon;
}

const EvolutionPage: React.FC<Props> = ({ pokemon }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chainLinks, setChainLinks] = useState<BasicObject[]>([]);

  const getData: Function = useCallback((obj: { species: BasicObject, evolves_to: { species: BasicObject, evolves_to: object[] }[] }, arr: BasicObject[]) => {
    const id = parseInt(obj.species.url.split('/').reverse()[1]);
    const chainLink: BasicObject = { name: '', url: '' };
    // Some parts of the evolution chain appear to have been added after Gen 1
    if (id <= 150) {
      const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      chainLink.name = obj.species.name;
      chainLink.url = url;
      arr.push(chainLink)
    }

    if (obj.evolves_to.length === 0) { return arr }

    return getData(obj.evolves_to[0], arr);
  }, []);

  const getChainData: any = useCallback((chain: any) => {
    const arr: BasicObject[] = [];
    const result = getData(chain, arr);
    return result;
  }, [getData]);

  useEffect(() => {
    PokeAPI.fetchEvolutionChain(pokemon).then(() => {
      const chain = getChainData(pokemon.data.evolutionChain);
      setChainLinks(chain);
      setIsLoading(false);
    });
  }, [pokemon, pokemon.evolutionChainFetched, getChainData])

  const pageContent = () => {
    return chainLinks.map(obj => {
        return (
          <Grid.Column key={obj.url} className="evolution-page-link-wrapper">
            <Image src={obj.url} />
            <p className="evolution-page-link-name">{obj.name}</p>
          </Grid.Column>
        )
      }
    )
  }

  if (isLoading) { return <LoadingSpinner /> }

  return (
    <Grid>
      <Grid.Row columns={3} centered>
        {pageContent()}
      </Grid.Row>
    </Grid>
  );
}

export default EvolutionPage;
