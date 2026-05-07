import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        
        <div className="hero-content">
          <h1 className="text-5xl font-bold text-primary animate-fade-in-up delay-200">
            Este site foi criado para ajudar as pessoas a reciclar e cuidar do meio ambiente.
          </h1>
          <p className="text-xl text-primary animate-fade-in-up delay-300 hero-subtitle">
            Aqui você pode encontrar pontos de coleta e aprender a descartar materiais recicláveis da forma correta.
          </p>
          <div className="hero-actions animate-fade-in-up delay-400">
            <Link to="/mapa" className="btn btn-glass btn-large">Começar Agora</Link>
          </div>
        </div>

        <div className="hero-visual animate-fade-in-up delay-300">
          <div className="glass-card main-card animate-float">
            <div className="glass-card inner-card">
              <img src="/hero-image.png" alt="Reciclagem e Meio Ambiente" className="hero-image" />
            </div>
          </div>
          
          <div className="glass-decoration glass-dec-1 liquid-glass animate-float delay-200"></div>
          <div className="glass-decoration glass-dec-2 liquid-glass animate-float delay-500"></div>
        </div>
        
      </div>
    </section>
  );
};
