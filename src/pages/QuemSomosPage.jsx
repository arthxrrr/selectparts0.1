import './PageStyles.css';

/**
 * QuemSomosPage - Página institucional
 * Contém história da empresa, missão e valores
 */
function QuemSomosPage() {
    const valores = [
        {
            title: 'Qualidade',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            title: 'Confiança',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore.'
        },
        {
            title: 'Inovação',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation.'
        },
        {
            title: 'Compromisso',
            description: 'Duis aute irure dolor in reprehenderit in voluptate.'
        },
        {
            title: 'Excelência',
            description: 'Excepteur sint occaecat cupidatat non proident.'
        },
        {
            title: 'Parceria',
            description: 'Sunt in culpa qui officia deserunt mollit anim id est.'
        }
    ];

    const timeline = [
        {
            year: '2008',
            title: 'Fundação',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.'
        },
        {
            year: '2012',
            title: 'Expansão Regional',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
        },
        {
            year: '2016',
            title: 'Rede de Assistências',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.'
        },
        {
            year: '2020',
            title: 'Transformação Digital',
            description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.'
        },
        {
            year: '2024',
            title: 'Líder de Mercado',
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.'
        }
    ];

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Quem Somos</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
                </div>
            </section>

            {/* About Section */}
            <section className="content-section">
                <div className="container">
                    <div className="two-column">
                        <div>
                            <h2>Nossa História</h2>
                            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </div>
                        <div>
                            <img
                                src="/image.png"
                                alt="Select Parts - Nossa História"
                                style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'block' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="content-section alt">
                <div className="container">
                    <div className="two-column reverse">
                        <div>
                            <h2>Nossa Missão</h2>
                            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                                quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                            </p>
                        </div>
                        <div>
                            <div className="timeline">
                                {timeline.map((item, index) => (
                                    <div key={index} className="timeline-item">
                                        <h4><span style={{ color: 'var(--primary-orange)' }}>{item.year}</span> - {item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="content-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Nossos Valores</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <div className="values-grid">
                        {valores.map((valor, index) => (
                            <div key={index} className="value-card">
                                <h4>{valor.title}</h4>
                                <p>{valor.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default QuemSomosPage;
