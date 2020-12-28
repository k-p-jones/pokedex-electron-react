import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link
        to={{
          pathname: "/pokemon",
          state: {
            selectedPokemon: pokemon
          } 
        }}
      >
        <div className="pokemon-card" style={{ backgroundColor: pokemon.color, color: textColor}}>
            <Image
              src={pokemon.imageURL}
            />
            <h3 className="pokemon-card-text" id={`header-${pokemon.name}`}>{pokemon.name}</h3>
        </div>
      </Link>
    </Grid.Column>
  )
}

export default PokemonCard;
