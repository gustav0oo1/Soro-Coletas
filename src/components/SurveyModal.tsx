import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import './SurveyModal.css';

const SURVEY_KEY = 'soro_coletas_survey_done';

// Formulário: https://forms.gle/SgwBHWzUeDUg66MEA
const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSeCbT3rY4dO7rwpTCGuEF2V0xke36Z4ga9NAfKfdkf5zAbzMg/formResponse';

// Entry IDs na ordem das perguntas (1 a 10)
const ENTRY_IDS = [
  'entry.1682424899', // Q1 - Você costuma reciclar seu lixo?
  'entry.1376735751', // Q2 - Você sabe onde ficam pontos de coleta?
  'entry.1879449615', // Q3 - Com que frequência você utiliza pontos de coleta?
  'entry.1109119504', // Q4 - Você acha fácil encontrar pontos de coleta?
  'entry.1249284731', // Q5 - Você separa o lixo reciclável em casa?
  'entry.995752776',  // Q6 - Principal motivo para não usar com frequência?
  'entry.1837538706', // Q7 - Existem pontos de coleta suficientes?
  'entry.151580945',  // Q8 - Já deixou de reciclar por não encontrar ponto?
  'entry.620397793',  // Q9 - Considera importante ter mais pontos de coleta?
  'entry.910796396',  // Q10 - Participaria mais se houvesse mais pontos?
];

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Você costuma reciclar seu lixo?',
    options: ['Sim', 'Não', 'Às vezes', 'Pouco'],
  },
  {
    id: 2,
    text: 'Você sabe onde ficam pontos de coleta de recicláveis na sua região?',
    options: ['Sim', 'Não', 'Já ouvi falar, mas não sei exatamente onde'],
  },
  {
    id: 3,
    text: 'Com que frequência você utiliza pontos de coleta?',
    options: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
  },
  {
    id: 4,
    text: 'Você acha fácil encontrar pontos de coleta perto de você?',
    options: ['Sim', 'Não', 'Mais ou menos'],
  },
  {
    id: 5,
    text: 'Você separa o lixo reciclável em casa?',
    options: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
  },
  {
    id: 6,
    text: 'Qual o principal motivo para você não usar pontos de coleta com frequência?',
    options: ['Falta de informação', 'Distância', 'Falta de tempo', 'Desinteresse'],
  },
  {
    id: 7,
    text: 'Você acredita que existem pontos de coleta suficientes na sua cidade?',
    options: ['Sim', 'Não', 'Não sei'],
  },
  {
    id: 8,
    text: 'Você já deixou de reciclar por não encontrar um ponto de coleta?',
    options: ['Sim', 'Não', 'Às vezes'],
  },
  {
    id: 9,
    text: 'Você considera importante ter mais pontos de coleta disponíveis?',
    options: ['Muito importante', 'Importante', 'Pouco importante', 'Não é importante'],
  },
  {
    id: 10,
    text: 'Você participaria mais da reciclagem se houvesse mais pontos de coleta próximos?',
    options: ['Sim', 'Não', 'Talvez'],
  },
];

export const SurveyModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated === true) {
      const done = localStorage.getItem(SURVEY_KEY);
      if (!done) {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } else if (isAuthenticated === false) {
      setIsVisible(false);
    }
  }, [isAuthenticated]);

  const handleAnswer = (option: string) => {
    const newAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 350);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const handleSkip = () => {
    localStorage.setItem(SURVEY_KEY, 'skipped');
    setIsVisible(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    localStorage.setItem(SURVEY_KEY, 'done');

    // Submete silenciosamente via iframe oculto
    if (formRef.current) {
      // Preenche os inputs ocultos com as respostas
      const form = formRef.current;
      // Limpa inputs anteriores
      form.querySelectorAll('input[data-survey]').forEach((el) => el.remove());

      Object.entries(answers).forEach(([qIndex, value]) => {
        const entryId = ENTRY_IDS[Number(qIndex)];
        if (entryId) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = entryId;
          input.value = value;
          input.setAttribute('data-survey', '1');
          form.appendChild(input);
        }
      });

      form.submit();
    }

    // Mostra tela de sucesso após breve delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 2800);
    }, 700);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswered = answers[currentQuestion] !== undefined;

  if (!isVisible) return null;

  return (
    <>
      {/* Iframe oculto que recebe o POST do Google Forms sem redirecionar a página */}
      <iframe
        ref={iframeRef}
        name="survey-iframe"
        id="survey-iframe"
        title="Survey submission"
        style={{ display: 'none', width: 0, height: 0, border: 'none' }}
        aria-hidden="true"
      />

      {/* Formulário oculto que faz o POST para o Google Forms */}
      <form
        ref={formRef}
        action={FORM_ACTION}
        method="POST"
        target="survey-iframe"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="survey-overlay" role="dialog" aria-modal="true" aria-label="Questionário sobre reciclagem">
        <div className={`survey-modal ${submitted ? 'survey-success' : ''}`}>

          {/* ── Conteúdo principal ── */}
          {!submitted && (
            <>
              <div className="survey-header">
                <div className="survey-header-top">
                  <div className="survey-icon-wrap">
                    <span className="survey-icon">♻️</span>
                  </div>
                  <div className="survey-title-group">
                    <h2 className="survey-title">Pesquisa de Reciclagem</h2>
                    <p className="survey-subtitle">Ajude-nos a melhorar! Leva menos de 2 minutos.</p>
                  </div>
                  <button className="survey-close-btn" onClick={handleSkip} aria-label="Fechar questionário">
                    ✕
                  </button>
                </div>

                <div className="survey-progress-wrap">
                  <div className="survey-progress-bar">
                    <div className="survey-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="survey-progress-label">
                    {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
              </div>

              <div className="survey-body">
                <div className="survey-question-wrap" key={currentQuestion}>
                  <p className="survey-question-number">Pergunta {currentQuestion + 1}</p>
                  <h3 className="survey-question-text">{questions[currentQuestion].text}</h3>

                  <div className="survey-options">
                    {questions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        id={`survey-q${currentQuestion}-opt${idx}`}
                        className={`survey-option-btn ${answers[currentQuestion] === option ? 'selected' : ''}`}
                        onClick={() => handleAnswer(option)}
                      >
                        <span className="survey-option-circle">
                          {answers[currentQuestion] === option ? '✓' : ''}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="survey-footer">
                <button
                  className="survey-nav-btn survey-back-btn"
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                >
                  ← Voltar
                </button>

                <button className="survey-skip-btn" onClick={handleSkip}>
                  Pular
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    className={`survey-nav-btn survey-submit-btn ${!currentAnswered ? 'disabled' : ''}`}
                    onClick={handleSubmit}
                    disabled={!currentAnswered || isSubmitting}
                  >
                    {isSubmitting ? <span className="survey-spinner" /> : 'Enviar ✓'}
                  </button>
                ) : (
                  <button
                    className={`survey-nav-btn survey-next-btn ${!currentAnswered ? 'disabled' : ''}`}
                    onClick={() => currentAnswered && setCurrentQuestion((p) => p + 1)}
                    disabled={!currentAnswered}
                  >
                    Próxima →
                  </button>
                )}
              </div>
            </>
          )}

          {/* ── Tela de sucesso ── */}
          {submitted && (
            <div className="survey-success-body">
              <div className="survey-success-icon">🌱</div>
              <h2 className="survey-success-title">Obrigado!</h2>
              <p className="survey-success-text">
                Suas respostas foram registradas com sucesso. Você está contribuindo para um mundo mais sustentável! 🌎
              </p>
              <div className="survey-success-dots">
                <span /><span /><span />
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};
