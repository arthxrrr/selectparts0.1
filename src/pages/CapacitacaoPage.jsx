import { Link } from 'react-router-dom';
import './PageStyles.css';

/**
 * CapacitacaoPage - Página de capacitação e treinamentos
 */
function CapacitacaoPage() {
    const cursos = [
        {
            title: 'Manutenção de Compressores de Parafuso',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
            duration: '40 horas',
            level: 'Intermediário',
            features: [
                'Diagnóstico de falhas',
                'Manutenção preventiva',
                'Troca de componentes',
                'Certificado incluso'
            ]
        },
        {
            title: 'Sistemas Pneumáticos Industriais',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
            duration: '32 horas',
            level: 'Básico',
            features: [
                'Fundamentos pneumáticos',
                'Leitura de diagramas',
                'Instalação de sistemas',
                'Material didático'
            ]
        },
        {
            title: 'Gestão de Manutenção Industrial',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
            duration: '24 horas',
            level: 'Avançado',
            features: [
                'Planejamento PCM',
                'Indicadores KPI',
                'Gestão de equipes',
                'Acompanhamento pós-curso'
            ]
        }
    ];

    const beneficios = [
        'Instrutores com experiência de mercado',
        'Certificado reconhecido',
        'Material didático completo',
        'Aulas práticas em laboratório',
        'Networking com profissionais',
        'Acesso a conteúdo online',
        'Suporte pós-curso',
        'Descontos para grupos'
    ];

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Capacitação</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="content-section">
                <div className="container">
                    <div className="two-column">
                        <div>
                            <h2>Invista no Seu Conhecimento</h2>
                            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p style={{ marginBottom: 'var(--spacing-xl)' }}>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                            </p>

                            <div className="benefits-list">
                                {beneficios.map((beneficio, index) => (
                                    <div key={index} className="benefit-item">
                                        <svg className="benefit-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                        <p>{beneficio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <img
                                src="/image.png"
                                alt="Capacitação Select Parts"
                                style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'block' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="content-section alt">
                <div className="container">
                    <div className="section-title">
                        <h2>Nossos Cursos</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <div className="values-grid">
                        {cursos.map((curso, index) => (
                            <div key={index} className="course-card">
                                <div className="course-image">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                                    </svg>
                                </div>
                                <div className="course-content">
                                    <h3>{curso.title}</h3>
                                    <p>{curso.description}</p>

                                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', margin: 'var(--spacing-md) 0' }}>
                                        <span style={{
                                            background: 'var(--neutral-200)',
                                            padding: 'var(--spacing-xs) var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: 'var(--font-size-sm)'
                                        }}>
                                            ⏱️ {curso.duration}
                                        </span>
                                        <span style={{
                                            background: 'var(--neutral-200)',
                                            padding: 'var(--spacing-xs) var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: 'var(--font-size-sm)'
                                        }}>
                                            📊 {curso.level}
                                        </span>
                                    </div>

                                    <div className="course-features">
                                        {curso.features.map((feature, idx) => (
                                            <div key={idx} className="course-feature">
                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="https://wa.me/5547992406258?text=Olá! Gostaria de saber mais sobre o curso de "
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                    >
                                        Quero me Inscrever
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Treinamento In Company</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Oferecemos treinamentos personalizados para sua equipe.</p>
                    <Link to="/seja-parceiro" className="btn btn-primary">
                        Solicitar Proposta
                    </Link>
                </div>
            </section>
        </>
    );
}

export default CapacitacaoPage;
