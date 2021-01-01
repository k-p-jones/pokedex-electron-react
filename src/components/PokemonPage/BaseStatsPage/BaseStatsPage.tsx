import React from 'react';
import { Progress } from 'semantic-ui-react';
import Pokemon from '../../../interfaces/Pokemon';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

interface Props {
  pokemon: Pokemon;
  isLoading: boolean;
}

const BaseStatsPage: React.FC<Props> = ({ pokemon, isLoading }) => {
  const statBars = pokemon.data.stats.map((s) => {
    // Going off the top base stat which is Chanseys HP, could be more accurate.
    const percent = Math.ceil((s.base_stat / 250) * 100);
    return (
      <div key={s.stat.name}>
        <p className="pokemon-page-stat-label"><b>{s.stat.name}:</b> {s.base_stat}</p>
        <Progress percent={percent} indicating />
      </div>
    )
  })

  const pageContent = () => isLoading ? <LoadingSpinner /> : statBars;

  return (
    <div>{pageContent()}</div>
  );
}

export default BaseStatsPage;
