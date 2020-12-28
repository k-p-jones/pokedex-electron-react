import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Menu, Icon, Grid, Container } from 'semantic-ui-react';
import Pokemon from '../../interfaces/Pokemon';
import './PokemonPage.css';

interface Props {
  location: {
    state: {
      selectedPokemon: Pokemon;
    };
  }
}

const PokemonPage: React.FC<Props> = (props) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  useEffect(() => {
    setSelectedPokemon(props.location.state.selectedPokemon);
    window.scrollTo(0, 0);
  }, [props.location.state.selectedPokemon]);

  return (
    <React.Fragment>
      <Menu fixed="top" className="pokemon-page-nav">
        <Menu.Item position="left">
          <Link to={{ pathname: '/' }}>
            <Icon name='arrow left' size="big" />
          </Link>
        </Menu.Item>
      </Menu>
        <div style={{ backgroundColor: selectedPokemon?.color}}>
          <div className="pokemon-page-wrapper">
            <Container>
              <div className="pokemon-page-title">
                <h1>{selectedPokemon?.name}</h1>
              </div>
              <div className="pokemon-page-image-wrapper">
                <Grid centered columns={3}>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Image src={selectedPokemon?.imageURL} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Container>
          </div>
          <div className="pokemon-page-info">
            <Container>
              <Menu borderless pointing secondary>
                <Menu.Item
                  name='About'
                  active
                />
                <Menu.Item
                  name='Base Stats'
                />
                <Menu.Item
                  name='Evolution'
                />
                <Menu.Item
                  name='Moves'
                />
              </Menu>
            </Container>
          </div>
        </div>
    </React.Fragment>
  )
}

export default PokemonPage;
