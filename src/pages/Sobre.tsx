import React from 'react';
import './Page.css';

export const Sobre: React.FC = () => {
  return (
    <div className="container page-container page-transition">
      <div className="page-header animate-fade-in-down delay-100">
        <h1 className="page-title">SOBRE NOS</h1>
      </div>
      
      <div className="content-glass animate-fade-in-up delay-200">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
          <p>
            Somos uma empresa comprometida com a transformação sustentável e a gestão inteligente de resíduos. Nosso propósito é contribuir para um futuro mais limpo e consciente, oferecendo soluções eficientes para a reciclagem e o reaproveitamento de materiais.
          </p>
          <p>
            Atuamos com foco na responsabilidade ambiental, auxiliando empresas e comunidades a reduzirem seus impactos no meio ambiente por meio de práticas sustentáveis. Acreditamos que a reciclagem vai além do descarte correto: é uma oportunidade de gerar valor, preservar recursos naturais e promover a economia circular.
          </p>
          <p>
            Nossa equipe é formada por profissionais qualificados e engajados, sempre em busca de inovação e melhoria contínua nos processos de coleta, separação e destinação dos resíduos. Trabalhamos com transparência, ética e compromisso, garantindo que cada etapa seja realizada com eficiência e respeito ao meio ambiente.
          </p>
          <p>
            Mais do que prestar serviços, buscamos conscientizar e inspirar mudanças positivas, incentivando hábitos sustentáveis e contribuindo para um mundo melhor para as próximas gerações.
          </p>
          
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="liquid-glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <h3 className="text-2xl font-bold text-primary" style={{ marginBottom: '1rem' }}>Nossa Missão</h3>
              <p>Promover soluções sustentáveis na gestão de resíduos.</p>
            </div>
            <div className="liquid-glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <h3 className="text-2xl font-bold text-primary" style={{ marginBottom: '1rem' }}>Nossa Visão</h3>
              <p>Ser referência em reciclagem e inovação ambiental.</p>
            </div>
            <div className="liquid-glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <h3 className="text-2xl font-bold text-primary" style={{ marginBottom: '1rem' }}>Nossos Valores</h3>
              <p>Sustentabilidade, responsabilidade, inovação e compromisso com o futuro.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
