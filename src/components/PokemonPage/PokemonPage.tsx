import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Menu, Icon, Grid, Container, Label, Progress } from 'semantic-ui-react';
import PokeAPI from '../../data/PokeAPI';
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
  const [badges, setBadges] = useState<Array<[]>>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPokemon(props.location.state.selectedPokemon);
  }, [props.location.state.selectedPokemon]);

  useEffect(() => {
    // I feel like I am working around TS here. Need to pass the
    // Pokemon into the component directly.
    if (!selectedPokemon) { return }

    PokeAPI.fetchPokemonData(props.location.state.selectedPokemon).then(() => {
      // :(
      const labels: any = [];

      selectedPokemon.data.types.forEach((t) => {
        labels.push(
          <Label
            key={`type-${t.name}`}
            className="pokemon-page-type-label"
            style={{ backgroundColor: selectedPokemon.color }}
          >
            {t.name}
          </Label>
        );
      });

      setBadges(labels)
    })
    
  }, [selectedPokemon, props.location.state.selectedPokemon])

  const stats = () => {
    const stats: any = []
    props.location.state.selectedPokemon.data.stats.forEach((s) => {
      // Going off the top base stat which is Chanseys HP, could be more accurate.
      // Move to its own component.
      const percent = Math.ceil((s.base_stat / 250) * 100);
      stats.push(
        <div key={s.stat.name}>
          <p className="pokemon-page-stat-label"><b>{s.stat.name}:</b> {s.base_stat}</p>
          <Progress percent={percent} indicating />
        </div>
      )
    });
    return stats
  }

  const tabContent = () => {
    switch (pageIndex) {
      case 0:
        return (stats())
      case 1:
        return (<p>1</p>)
      case 2:
        return (<p>2</p>)
      case 3:
        return (<p>3</p>)                
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
        <div style={{ backgroundColor: selectedPokemon?.color}}>
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
                  name='Moves'
                  active={pageIndex === 2}
                  onClick={() => setPageIndex(2)}
                />
                <Menu.Item
                  name='Type Stats'
                  active={pageIndex === 3}
                  onClick={() => setPageIndex(3)}
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
