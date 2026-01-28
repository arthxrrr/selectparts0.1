import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { assistencias, ordenarPorProximidade } from '../data/assistencias';
import { obterLocalizacao, buscarPorCep, formatarDistancia } from '../utils/geolocation';
import './AssistenciasPage.css';
import './PageStyles.css';

// Fix para ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ícone customizado para marcadores
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Ícone para localização do usuário
const userIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZTg1ZDA0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjZTg1ZDA0IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyIvPjwvc3ZnPg==',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
});

/**
 * Componente para atualizar a visualização do mapa
 */
function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom, { animate: true });
        }
    }, [center, zoom, map]);
    return null;
}

/**
 * AssistenciasPage - Página com mapa e lista de assistências
 */
function AssistenciasPage() {
    const [userLocation, setUserLocation] = useState(null);
    const [listaAssistencias, setListaAssistencias] = useState(assistencias);
    const [selectedAssistencia, setSelectedAssistencia] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [cep, setCep] = useState('');
    const [searchMessage, setSearchMessage] = useState(null);
    const [mapCenter, setMapCenter] = useState([-26.5, -49.0]); // Centro de SC
    const [mapZoom, setMapZoom] = useState(7);
    const [locationAsked, setLocationAsked] = useState(false);
    const mapRef = useRef(null);

    // Pede localização ao entrar na página
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!locationAsked) {
                handleRequestLocation();
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleRequestLocation = async () => {
        setLocationAsked(true);
        try {
            const location = await obterLocalizacao();
            setUserLocation(location);
            setMapCenter([location.lat, location.lng]);
            setMapZoom(10);

            // Ordena por proximidade
            const ordenadas = ordenarPorProximidade(assistencias, location.lat, location.lng);
            setListaAssistencias(ordenadas);

            setSearchMessage({ type: 'success', text: 'Localização obtida! Ordenamos as assistências por proximidade.' });
        } catch (error) {
            setSearchMessage({ type: 'info', text: 'Localização não disponível. Use a busca por CEP.' });
        }
    };

    const handleCepSearch = async (e) => {
        e.preventDefault();
        if (!cep.trim()) return;

        setSearchMessage({ type: 'info', text: 'Buscando...' });

        try {
            const result = await buscarPorCep(cep);
            setUserLocation({ lat: result.lat, lng: result.lng });
            setMapCenter([result.lat, result.lng]);
            setMapZoom(12);

            // Ordena por proximidade
            const ordenadas = ordenarPorProximidade(assistencias, result.lat, result.lng);
            setListaAssistencias(ordenadas);

            setSearchMessage({ type: 'success', text: `Localização encontrada: ${result.endereco}` });
        } catch (error) {
            setSearchMessage({ type: 'error', text: error.message });
        }
    };

    const handleCardClick = (assistencia) => {
        setSelectedAssistencia(assistencia);
        setMapCenter([assistencia.coords.lat, assistencia.coords.lng]);
        setMapZoom(14);
    };

    const handleMarkerClick = (assistencia) => {
        setSelectedAssistencia(assistencia);
        setModalOpen(true);
    };

    const openModal = (assistencia) => {
        setSelectedAssistencia(assistencia);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openGoogleMaps = (assistencia) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(assistencia.endereco)}`;
        window.open(url, '_blank');
    };

    const openWhatsApp = (assistencia) => {
        const message = `Olá! Vi no site da Select Parts que vocês são uma assistência técnica. Gostaria de mais informações.`;
        const phone = assistencia.telefone.replace(/\D/g, '');
        const url = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Assistências Técnicas</h1>
                    <p>Encontre a assistência técnica mais próxima de você</p>
                </div>
            </section>

            {/* Content */}
            <section className="content-section">
                <div className="container">
                    <div className="assistencias-content">
                        {/* Map */}
                        <div className="map-container">
                            <MapContainer
                                center={mapCenter}
                                zoom={mapZoom}
                                ref={mapRef}
                                style={{ height: '100%', minHeight: '500px' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MapUpdater center={mapCenter} zoom={mapZoom} />

                                {/* Marcador da localização do usuário */}
                                {userLocation && (
                                    <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                                        <Popup>Sua localização</Popup>
                                    </Marker>
                                )}

                                {/* Marcadores das assistências */}
                                {listaAssistencias.map((assistencia) => (
                                    <Marker
                                        key={assistencia.id}
                                        position={[assistencia.coords.lat, assistencia.coords.lng]}
                                        icon={customIcon}
                                        eventHandlers={{
                                            click: () => handleMarkerClick(assistencia)
                                        }}
                                    >
                                        <Popup>
                                            <strong>{assistencia.nome}</strong>
                                            <br />
                                            {assistencia.cidade} - {assistencia.estado}
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>

                        {/* Sidebar */}
                        <div className="assistencias-sidebar">
                            {/* Search Box */}
                            <div className="search-box">
                                <h3>Buscar por CEP</h3>
                                <form className="search-form" onSubmit={handleCepSearch}>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Digite seu CEP"
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value)}
                                        maxLength={9}
                                    />
                                    <button type="submit" className="btn btn-primary">
                                        Buscar
                                    </button>
                                </form>

                                {searchMessage && (
                                    <div className={`search-message ${searchMessage.type}`}>
                                        {searchMessage.text}
                                    </div>
                                )}
                            </div>

                            {/* Location Permission */}
                            {!userLocation && (
                                <div className="location-permission">
                                    <p>Permita o acesso à sua localização para encontrar a assistência mais próxima.</p>
                                    <button className="btn" onClick={handleRequestLocation}>
                                        📍 Usar Minha Localização
                                    </button>
                                </div>
                            )}

                            {/* Cards List */}
                            <div className="assistencias-list">
                                {listaAssistencias.map((assistencia) => (
                                    <div
                                        key={assistencia.id}
                                        className={`assistencia-card ${selectedAssistencia?.id === assistencia.id ? 'active' : ''}`}
                                        onClick={() => handleCardClick(assistencia)}
                                        onDoubleClick={() => openModal(assistencia)}
                                    >
                                        <div className="assistencia-card-header">
                                            <img
                                                src={assistencia.logo}
                                                alt={assistencia.nome}
                                                className="assistencia-card-logo"
                                            />
                                            <div className="assistencia-card-info">
                                                <h4>{assistencia.nome}</h4>
                                                <span className="cidade">{assistencia.cidade} - {assistencia.estado}</span>
                                            </div>
                                        </div>
                                        <span className="assistencia-card-especialidade">
                                            {assistencia.especialidade}
                                        </span>
                                        {assistencia.distancia && (
                                            <div className="assistencia-card-distancia">
                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                </svg>
                                                {formatarDistancia(assistencia.distancia)}
                                            </div>
                                        )}
                                        <button
                                            className="btn btn-secondary"
                                            style={{ width: '100%', marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-sm)' }}
                                            onClick={(e) => { e.stopPropagation(); openModal(assistencia); }}
                                        >
                                            Ver Detalhes
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {modalOpen && selectedAssistencia && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedAssistencia.nome}</h3>
                            <button className="modal-close" onClick={closeModal}>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <img
                                src={selectedAssistencia.logo}
                                alt={selectedAssistencia.nome}
                                className="modal-logo"
                            />

                            <div className="modal-especialidade">
                                <span>{selectedAssistencia.especialidade}</span>
                            </div>

                            <div className="modal-info-item">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <div>
                                    <strong>Endereço</strong>
                                    <span>{selectedAssistencia.endereco}</span>
                                </div>
                            </div>

                            <div className="modal-info-item">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <div>
                                    <strong>Telefone</strong>
                                    <span>{selectedAssistencia.telefone}</span>
                                </div>
                            </div>

                            {selectedAssistencia.distancia && (
                                <div className="modal-info-item">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                                    </svg>
                                    <div>
                                        <strong>Distância</strong>
                                        <span>{formatarDistancia(selectedAssistencia.distancia)} de você</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => openGoogleMaps(selectedAssistencia)}
                            >
                                📍 Ver no Maps
                            </button>
                            <button
                                className="btn btn-whatsapp"
                                onClick={() => openWhatsApp(selectedAssistencia)}
                            >
                                💬 WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AssistenciasPage;
