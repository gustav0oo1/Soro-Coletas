import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import '../Page.css';

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      if (error.message === 'email rate limit exceeded') {
        setError('Limite de tentativas atingido (proteção anti-spam do Supabase). Desative a confirmação de e-mail no painel ou tente outro e-mail.');
      } else if (error.message === 'User already registered') {
        setError('Este e-mail já está cadastrado.');
      } else {
        setError(error.message);
      }
    } else {
      navigate('/mapa');
    }
  };

  return (
    <div className="container page-container page-transition" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="content-glass animate-fade-in-up delay-100" style={{ maxWidth: '500px', width: '100%', padding: '4rem 3rem' }}>
        <h2 className="text-4xl font-bold text-primary" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>CRIAR CONTA</h2>
        
        {error && (
          <div style={{ background: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="font-semibold text-primary">EMAIL:</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-glass-border)', background: 'rgba(255,255,255,0.7)', outline: 'none', transition: 'border-color 0.2s' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="font-semibold text-primary">SENHA:</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-glass-border)', background: 'rgba(255,255,255,0.7)', outline: 'none', transition: 'border-color 0.2s' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="font-semibold text-primary">CONFIRMAR SENHA:</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-glass-border)', background: 'rgba(255,255,255,0.7)', outline: 'none', transition: 'border-color 0.2s' }} 
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-glass" style={{ marginTop: '1.5rem', width: '100%', padding: '1rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'CRIANDO...' : 'CRIAR CONTA'}
          </button>
        </form>
        
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <p style={{ opacity: 0.8 }}>Já tem uma conta?</p>
          <Link to="/login" className="text-primary font-bold" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '0.5rem', transition: 'color 0.2s' }}>ENTRAR</Link>
        </div>
      </div>
    </div>
  );
};
