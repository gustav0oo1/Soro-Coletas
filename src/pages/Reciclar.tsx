import React from 'react';
import './Page.css';

export const Reciclar: React.FC = () => {
  const steps = [
    { title: "Objetivo", content: "Estabelecer um sistema eficiente de gerenciamento de resíduos, visando reduzir impactos ambientais, promover a sustentabilidade e otimizar o reaproveitamento de materiais recicláveis." },
    { title: "Diagnóstico Inicial", content: "Levantamento dos tipos de resíduos gerados (papel, plástico, vidro, metal, orgânico). Quantidade média produzida. Identificação de desperdícios. Avaliação das práticas atuais de descarte." },
    { title: "Classificação dos Resíduos", content: "Os resíduos devem ser separados em categorias: Recicláveis (papel, plástico, vidro e metal), Orgânicos (restos de alimentos) e Rejeitos (materiais não recicláveis)." },
    { title: "Estrutura de Coleta", content: "Implantação de lixeiras seletivas identificadas por cores. Pontos estratégicos de descarte. Parcerias com cooperativas ou empresas recicladoras. Definição de frequência de coleta." },
    { title: "Processos Operacionais", content: "Separação correta dos resíduos na origem. Armazenamento adequado. Transporte seguro até o destino final. Destinação correta (reciclagem ou descarte apropriado)." },
    { title: "Treinamento e Conscientização", content: "Capacitação de colaboradores. Campanhas educativas internas. Incentivo a práticas sustentáveis." },
    { title: "Monitoramento e Indicadores", content: "Volume de resíduos reciclados. Redução de lixo gerado. Taxa de reciclagem (%). Relatórios periódicos de desempenho." },
    { title: "Melhoria Contínua", content: "Revisão dos processos. Implementação de novas tecnologias. Ajustes conforme resultados obtidos." },
    { title: "Benefícios Esperados", content: "Redução de custos com descarte. Menor impacto ambiental. Fortalecimento da imagem da empresa. Contribuição para a economia circular." },
    { title: "Compromisso Sustentável", content: "Nossa empresa assume o compromisso de atuar de forma responsável, promovendo práticas sustentáveis e contribuindo para um futuro mais consciente e ecológico." }
  ];

  return (
    <div className="container page-container page-transition">
      <div className="page-header animate-fade-in-down delay-100">
        <h1 className="page-title">COMO RECICLAR</h1>
      </div>
      
      <div className="content-glass animate-fade-in-up delay-200">
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="liquid-glass step-card">
              <div className="step-number">
                {index + 1}
              </div>
              <div className="step-content">
                <h3 className="text-2xl font-bold text-primary step-title">{step.title}</h3>
                <p className="step-text">{step.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
