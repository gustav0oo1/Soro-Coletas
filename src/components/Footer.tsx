import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            Soro Coletas
          </div>
          <p className="footer-text">
            © 2026 Soro Coletas. Cuidando do meio ambiente para um futuro melhor.
          </p>
        </div>
      </div>
    </footer>
  );
};
