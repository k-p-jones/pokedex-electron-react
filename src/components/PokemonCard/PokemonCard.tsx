import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import COLORS from '../../consts/colors';
import Pokemon from '../../interfaces/Pokemon';
import './PokemonCard.css';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const textColor: string = pokemon.color === COLORS['white'] ? COLORS['altText'] : COLORS['white'];

  return (
    <Grid.Column>
      <div className="pokemon-card" style={{ backgroundColor: pokemon.color, color: textColor}}>
        <div>
          <Image
            src={pokemon.imageURL}
          />
        </div>
        <h3 style={{ marginTop: 5, textTransform: 'uppercase' }} id={`header-${pokemon.name}`} >{pokemon.name}</h3>
      </div>
    </Grid.Column>
  )
}

export default PokemonCard;
