import React from 'react';
import { Hero } from '../components/Hero';
import './Page.css';

export const Home: React.FC = () => {
  return (
    <div className="page-transition">
      <Hero />
    </div>
  );
};
