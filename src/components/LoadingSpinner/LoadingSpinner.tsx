import React from 'react';
import { Image } from 'semantic-ui-react';
import pokeball from '../../images/pokeball.svg';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <Image src={pokeball} />
    <p>Loading...</p>
  </div>
)

export default LoadingSpinner;
