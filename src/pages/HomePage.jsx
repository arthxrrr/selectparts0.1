import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

/**
 * HomePage - Página inicial do site
 * Contém Hero, Prova Social, Diferenciais e CTA
 */
function HomePage() {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        mensagem: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Por enquanto apenas simula o envio
        alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
        setFormData({ nome: '', telefone: '', email: '', mensagem: '' });
    };

    const stats = [
        { number: '5000+', label: 'Peças Entregues' },
        { number: '100+', label: 'Assistências Parceiras' },
        { number: '15+', label: 'Anos de Experiência' },
        { number: '98%', label: 'Clientes Satisfeitos' }
    ];

    const testimonials = [
        {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            author: 'João Silva',
            company: 'Indústria ABC',
            initials: 'JS'
        },
        {
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            author: 'Maria Santos',
            company: 'Metalúrgica XYZ',
            initials: 'MS'
        },
        {
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            author: 'Carlos Oliveira',
            company: 'Automação Industrial',
            initials: 'CO'
        }
    ];

    const diferenciais = [
        {
            title: 'Suporte Especializado',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
            icon: (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            )
        },
        {
            title: 'Peças Originais',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
            icon: (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                </svg>
            )
        },
        {
            title: 'Entrega Rápida',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
            icon: (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
            )
        },
        {
            title: 'Treinamentos',
            description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
            icon: (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
            )
        },
        {
            title: 'Assistência Nacional',
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
            icon: (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
            )
        },
        {
            title: 'Garantia de Qualidade',
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
            icon: (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
            )
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <span className="hero-badge">Especialistas em Compressores</span>
                        <h1 className="hero-title">
                            Peças e Assistência Técnica para <span>Compressores Industriais</span>
                        </h1>
                        <p className="hero-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/assistencias" className="btn btn-primary">
                                Encontrar Assistência
                            </Link>
                            <Link to="/quem-somos" className="btn btn-secondary">
                                Conheça a Select Parts
                            </Link>
                        </div>
                    </div>

                    <div className="hero-form">
                        <h3>Fale com um Especialista</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    className="form-input"
                                    placeholder="Seu nome completo"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="telefone">Telefone</label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    className="form-input"
                                    placeholder="(00) 00000-0000"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="seu@email.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Solicitar Contato
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="section social-proof">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="section-title">
                        <h2>O Que Nossos Clientes Dizem</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <p className="testimonial-text">{testimonial.text}</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{testimonial.initials}</div>
                                    <div className="testimonial-info">
                                        <strong>{testimonial.author}</strong>
                                        <span>{testimonial.company}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Diferenciais Section */}
            <section className="section diferenciais">
                <div className="container">
                    <div className="section-title">
                        <h2>Nossos Diferenciais</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
                    </div>

                    <div className="diferenciais-grid">
                        {diferenciais.map((diferencial, index) => (
                            <div key={index} className="diferencial-card">
                                <div className="diferencial-icon">{diferencial.icon}</div>
                                <h3>{diferencial.title}</h3>
                                <p>{diferencial.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Pronto para Encontrar a Assistência Mais Próxima?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
                    <Link to="/assistencias" className="btn btn-primary">
                        Ver Mapa de Assistências
                    </Link>
                </div>
            </section>
        </>
    );
}

export default HomePage;
