import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container flex-between">
        <Link to="/" className="navbar-logo animate-fade-in-down delay-100" onClick={closeMenu}>
          <img src="/logosoro.png" alt="Soro Coletas Logo" className="navbar-logo-img" />
          Soro Coletas
        </Link>
        
        <button className={`hamburger ${isMenuOpen ? 'open' : ''} animate-fade-in-down delay-100`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <nav className="navbar-links animate-fade-in-down delay-200">
            <Link to="/sobre" className="nav-link" onClick={closeMenu}>SOBRE NOS</Link>
            <Link to="/reciclar" className="nav-link" onClick={closeMenu}>COMO RECICLAR</Link>
            <Link to="/mapa" className="nav-link" onClick={closeMenu}>PONTOS DE COLETA</Link>
          </nav>

          <div className="navbar-action animate-fade-in-down delay-300">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn btn-glass" style={{ background: 'rgba(200, 50, 50, 0.1)', borderColor: 'rgba(200, 50, 50, 0.3)', color: '#a00' }}>SAIR</button>
            ) : (
              <Link to="/login" className="btn btn-glass" onClick={closeMenu}>ENTRAR</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
