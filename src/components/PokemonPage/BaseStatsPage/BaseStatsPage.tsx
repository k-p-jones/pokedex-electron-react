import React from 'react';
import { Progress } from 'semantic-ui-react';
import Pokemon from '../../../interfaces/Pokemon';

interface Props {
  pokemon: Pokemon;
}

const BaseStatsPage: React.FC<Props> = ({ pokemon }) => {
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

  return (
    <div>{statBars}</div>
  );
}

export default BaseStatsPage;
