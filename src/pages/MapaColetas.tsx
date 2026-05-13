import React, { useState } from 'react';
import './Page.css';

export const MapaColetas: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('Sorocaba, SP');

  const ecopontos = [
    {
      id: 1,
      nome: 'Ecoponto Central',
      endereco: 'Av. Dom Aguirre, 100 - Sorocaba, SP',
      horario: 'Segunda a Sexta, das 08:00 às 17:00'
    },
    {
      id: 2,
      nome: 'Ecoponto Norte',
      endereco: 'Rua Itavuvu, 2000 - Sorocaba, SP',
      horario: 'Segunda a Sábado, das 09:00 às 16:00'
    }
  ];

  return (
    <div className="container page-container page-transition">
      <div className="page-header animate-fade-in-down delay-100">
        <h1 className="page-title">PONTOS DE COLETA</h1>
      </div>
      
      <div className="content-glass animate-fade-in-up delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', opacity: 0.9 }}>
          Clique em um ecoponto abaixo para visualizar no mapa ou trace uma rota direta do seu celular.
        </p>

        <div className="liquid-glass" style={{ width: '100%', height: '500px', borderRadius: 'var(--radius-md)', overflow: 'hidden', padding: '0.5rem', transition: 'all 0.3s ease' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: 'calc(var(--radius-md) - 4px)' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}>
          </iframe>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {ecopontos.map((ponto, index) => (
            <div 
              key={ponto.id} 
              className={`liquid-glass animate-float delay-${(index + 1) * 100}`} 
              onClick={() => setSelectedLocation(ponto.endereco)}
              style={{ 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-md)', 
                cursor: 'pointer',
                border: selectedLocation === ponto.endereco ? '2px solid var(--color-primary)' : '1px solid var(--color-glass-border)',
                transform: selectedLocation === ponto.endereco ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
            >
              <h3 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📍 {ponto.nome}
              </h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>ENDEREÇO:</strong> {ponto.endereco}</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}><strong>HORÁRIO:</strong> {ponto.horario}</p>
              
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ponto.endereco)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-glass"
                style={{ width: '100%', display: 'block', textAlign: 'center', fontSize: '1rem', padding: '0.8rem' }}
                onClick={(e) => e.stopPropagation()}
              >
                🗺️ Traçar Rota
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
