import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Menu, Icon, Grid, Container, Label } from 'semantic-ui-react';
import PokeAPI from '../../data/PokeAPI';
import Pokemon from '../../interfaces/Pokemon';
import BaseStatsPage from './BaseStatsPage/BaseStatsPage';
import DamageStatsPage from './DamageStatsPage/DamageStatsPage';
import EvolutionPage from './EvolutionPage/EvolutionPage';
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
  const [badges, setBadges] = useState<JSX.Element[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const determineBgColor = useCallback(() => {
    return selectedPokemon?.color === '#fff' ? 'grey' : selectedPokemon?.color;
  }, [selectedPokemon?.color])

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPokemon(props.location.state.selectedPokemon);
  }, [props.location.state.selectedPokemon]);

  useEffect(() => {
    // I feel like I am working around TS here. Need to pass the
    // Pokemon into the component directly.
    if (!selectedPokemon) { return }
    setIsLoading(true)
    PokeAPI.fetchPokemonData(props.location.state.selectedPokemon).then(() => {
      const labels = selectedPokemon.data.types.map((t) => (
          <Label
            key={`type-${t.name}`}
            className="pokemon-page-type-label"
            style={{ backgroundColor: determineBgColor() }}
          >
            {t.name}
          </Label>
      ));
      setBadges(labels)
      setIsLoading(false);
    })
    
  }, [selectedPokemon, props.location.state.selectedPokemon, determineBgColor])

  const tabContent = () => {
    switch (pageIndex) {
      case 0:
        return (
          <BaseStatsPage pokemon={props.location.state.selectedPokemon} isLoading={isLoading} />
        )
      case 1:
        return (
          <EvolutionPage pokemon={props.location.state.selectedPokemon} />
        )
      case 2:
        return (
          <DamageStatsPage pokemon={props.location.state.selectedPokemon} />
        )                
      default:
        break;
    }
  }


  return (
    <React.Fragment>
      <Menu fixed="top" className="pokemon-page-nav">
        <Menu.Item position="left">
          <Link to={{ pathname: '/' }}>
            <Icon name='arrow left' size="big" />
          </Link>
        </Menu.Item>
      </Menu>
        <div style={{ backgroundColor: determineBgColor() }}>
          <div className="pokemon-page-wrapper">
            <Container>
              <div className="pokemon-page-title">
                <h1>{selectedPokemon?.name}</h1>
                {badges}
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
                  name='Base Stats'
                  active={pageIndex === 0}
                  onClick={() => setPageIndex(0)}
                />
                <Menu.Item
                  name='Evolution'
                  active={pageIndex === 1}
                  onClick={() => setPageIndex(1)}
                />
                <Menu.Item
                  name='Type Stats'
                  active={pageIndex === 2}
                  onClick={() => setPageIndex(2)}
                />
              </Menu>
              {tabContent()}
            </Container>
          </div>
        </div>
    </React.Fragment>
  )
}

export default PokemonPage;
