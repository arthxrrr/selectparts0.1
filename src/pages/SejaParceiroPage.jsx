import { useState } from 'react';
import './PageStyles.css';

/**
 * SejaParceiroPage - Página para cadastro de parceiros
 */
function SejaParceiroPage() {
    const [formData, setFormData] = useState({
        empresa: '',
        cnpj: '',
        nome: '',
        cargo: '',
        telefone: '',
        email: '',
        cidade: '',
        estado: '',
        areaAtuacao: '',
        mensagem: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Cadastro enviado com sucesso! Entraremos em contato em breve.');
        setFormData({
            empresa: '',
            cnpj: '',
            nome: '',
            cargo: '',
            telefone: '',
            email: '',
            cidade: '',
            estado: '',
            areaAtuacao: '',
            mensagem: ''
        });
    };

    const beneficios = [
        {
            title: 'Acesso Exclusivo',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            title: 'Suporte Prioritário',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore.'
        },
        {
            title: 'Treinamentos Gratuitos',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation.'
        },
        {
            title: 'Condições Especiais',
            description: 'Duis aute irure dolor in reprehenderit in voluptate.'
        },
        {
            title: 'Material de Apoio',
            description: 'Excepteur sint occaecat cupidatat non proident.'
        },
        {
            title: 'Networking',
            description: 'Sunt in culpa qui officia deserunt mollit anim id est.'
        }
    ];

    const estados = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Seja um Parceiro</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faça parte da nossa rede.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="content-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Vantagens de Ser Parceiro</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <div className="values-grid">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className="value-card">
                                <h4>{beneficio.title}</h4>
                                <p>{beneficio.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="content-section alt">
                <div className="container">
                    <div className="section-title">
                        <h2>Cadastre-se</h2>
                        <p>Preencha o formulário abaixo e nossa equipe entrará em contato.</p>
                    </div>

                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="empresa">Nome da Empresa *</label>
                                    <input
                                        type="text"
                                        id="empresa"
                                        name="empresa"
                                        className="form-input"
                                        placeholder="Razão Social"
                                        value={formData.empresa}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cnpj">CNPJ</label>
                                    <input
                                        type="text"
                                        id="cnpj"
                                        name="cnpj"
                                        className="form-input"
                                        placeholder="00.000.000/0000-00"
                                        value={formData.cnpj}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="nome">Nome do Responsável *</label>
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
                                    <label className="form-label" htmlFor="cargo">Cargo</label>
                                    <input
                                        type="text"
                                        id="cargo"
                                        name="cargo"
                                        className="form-input"
                                        placeholder="Ex: Gerente Técnico"
                                        value={formData.cargo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="telefone">Telefone *</label>
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
                                    <label className="form-label" htmlFor="email">E-mail *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="email@empresa.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cidade">Cidade *</label>
                                    <input
                                        type="text"
                                        id="cidade"
                                        name="cidade"
                                        className="form-input"
                                        placeholder="Sua cidade"
                                        value={formData.cidade}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="estado">Estado *</label>
                                    <select
                                        id="estado"
                                        name="estado"
                                        className="form-input"
                                        value={formData.estado}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        {estados.map(uf => (
                                            <option key={uf} value={uf}>{uf}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="areaAtuacao">Área de Atuação</label>
                                <select
                                    id="areaAtuacao"
                                    name="areaAtuacao"
                                    className="form-input"
                                    value={formData.areaAtuacao}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione sua área de atuação</option>
                                    <option value="assistencia">Assistência Técnica</option>
                                    <option value="revenda">Revenda de Peças</option>
                                    <option value="industria">Indústria</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="mensagem">Mensagem</label>
                                <textarea
                                    id="mensagem"
                                    name="mensagem"
                                    className="form-input"
                                    placeholder="Conte-nos sobre sua empresa e interesse em parceria..."
                                    rows="4"
                                    value={formData.mensagem}
                                    onChange={handleInputChange}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Enviar Cadastro
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SejaParceiroPage;
