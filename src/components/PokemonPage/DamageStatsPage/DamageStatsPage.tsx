import React, { useEffect, useState } from 'react';
import { Loader, Segment } from 'semantic-ui-react';
import PokeAPI from '../../../data/PokeAPI';
import BasicObject from '../../../interfaces/BasicObject';
import Pokemon from '../../../interfaces/Pokemon';
import './DamageStatsPage.css';

interface Props {
  pokemon: Pokemon;
}

const DamageStatsPage: React.FC<Props> = ({ pokemon }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    PokeAPI.fetchTypeData(pokemon).then(() => setIsLoading(false));
  }, [pokemon])

  const strongAttacking = (data: BasicObject[]) => {
    const types = data.map((t) => <li key={`type-${t.name}-2x-damage-given`}>{t.name}</li>)

    // Normal type has no 2x damage modifiers
    if (types.length === 0) { return null }

    return (
      <React.Fragment>
        <h3>Strong Attacking (2x Damage)</h3>
        <ul>{types}</ul>
      </React.Fragment>
    )
  }

  const weakAttacking = (halfDamage: BasicObject[], noDamage: BasicObject[]) => {
    const hd = halfDamage.map(t => <li key={`type-${t.name}-half-damage-given`}>{t.name}</li>);
    const nd = noDamage.map(t => <li key={`type-${t.name}-no-damage-given`}>{t.name}</li>);

    let halfDamageDisplay;
    let noDamageDisplay;

    if (hd.length > 0) {
      halfDamageDisplay = (
        <React.Fragment>
          <h3>Weak Attacking (1/2 Damage)</h3>
          <ul>{hd}</ul>
        </React.Fragment>
      );
    }

    if (nd.length > 0) {
      noDamageDisplay = (
        <React.Fragment>
          <h3>Weak Attacking (No Damage)</h3>
          <ul>{nd}</ul>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {halfDamageDisplay}
        {noDamageDisplay}
      </React.Fragment>
    )
  }

  const strongDefending = (halfDamage: BasicObject[], noDamage: BasicObject[]) => {
    const hd = halfDamage.map(t => <li key={`type-${t.name}-half-damage`}>{t.name}</li>);
    const nd = noDamage.map(t => <li key={`type-${t.name}-no-damage`}>{t.name}</li>);

    let halfDamageDisplay;
    let noDamageDisplay;

    if (hd.length > 0) {
      halfDamageDisplay = (
        <React.Fragment>
          <h3>Strong Defending (1/2 Damage)</h3>
          <ul>{hd}</ul>
        </React.Fragment>
      );
    }

    if (nd.length > 0) {
      noDamageDisplay = (
        <React.Fragment>
          <h3>Strong Defending (Immune)</h3>
          <ul>{nd}</ul>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {halfDamageDisplay}
        {noDamageDisplay}
      </React.Fragment>
    )
  }

  const weakDefending = (data: BasicObject[]) => {
    const types = data.map((t) => <li key={`type-${t.name}-2x-damage-recieved`}>{t.name}</li>)

    return (
      <React.Fragment>
        <h3>Weak Defending (2x Damage)</h3>
        <ul>{types}</ul>
      </React.Fragment>
    )
  }

  const damageStats = () => (
    pokemon.data.types.map((t) => {
      return (
        <Segment key={`type-${t.name}-data`}>
          <h1 className="damage-stats-page-type-header">{t.name}</h1>
          {strongAttacking(t.data.double_damage_to)}
          {strongDefending(t.data.half_damage_from, t.data.no_damage_from)}
          {weakAttacking(t.data.half_damage_to, t.data.no_damage_to)}
          {weakDefending(t.data.double_damage_from)}
        </Segment>
      )
    })
  )

  if (isLoading) {
    return <Loader />
  }

  return (<React.Fragment>{damageStats()}</React.Fragment>)
}

export default DamageStatsPage;
