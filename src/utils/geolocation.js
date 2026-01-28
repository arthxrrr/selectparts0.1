/**
 * Utilitários para geolocalização
 */

/**
 * Obtém a localização atual do usuário
 * @returns {Promise<{lat: number, lng: number}>}
 */
export function obterLocalizacao() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalização não suportada pelo navegador'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                let mensagem = 'Erro ao obter localização';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        mensagem = 'Permissão de localização negada';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        mensagem = 'Localização indisponível';
                        break;
                    case error.TIMEOUT:
                        mensagem = 'Tempo limite excedido';
                        break;
                }
                reject(new Error(mensagem));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutos de cache
            }
        );
    });
}

/**
 * Busca coordenadas a partir de um CEP usando a API do Nominatim (OpenStreetMap)
 * @param {string} cep - CEP para buscar
 * @returns {Promise<{lat: number, lng: number, endereco: string}>}
 */
export async function buscarPorCep(cep) {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        throw new Error('CEP inválido. Digite 8 dígitos.');
    }

    try {
        // Primeiro busca o endereço via ViaCEP
        const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const viaCepData = await viaCepResponse.json();

        if (viaCepData.erro) {
            throw new Error('CEP não encontrado');
        }

        // Depois busca as coordenadas via Nominatim
        const query = `${viaCepData.logradouro}, ${viaCepData.localidade}, ${viaCepData.uf}, Brasil`;
        const nominatimResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
            {
                headers: {
                    'User-Agent': 'SelectParts/1.0'
                }
            }
        );
        const nominatimData = await nominatimResponse.json();

        if (nominatimData.length === 0) {
            // Fallback: busca só pela cidade
            const cityQuery = `${viaCepData.localidade}, ${viaCepData.uf}, Brasil`;
            const cityResponse = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityQuery)}&limit=1`,
                {
                    headers: {
                        'User-Agent': 'SelectParts/1.0'
                    }
                }
            );
            const cityData = await cityResponse.json();

            if (cityData.length === 0) {
                throw new Error('Não foi possível encontrar a localização do CEP');
            }

            return {
                lat: parseFloat(cityData[0].lat),
                lng: parseFloat(cityData[0].lon),
                endereco: `${viaCepData.localidade}, ${viaCepData.uf}`
            };
        }

        return {
            lat: parseFloat(nominatimData[0].lat),
            lng: parseFloat(nominatimData[0].lon),
            endereco: `${viaCepData.logradouro}, ${viaCepData.bairro}, ${viaCepData.localidade} - ${viaCepData.uf}`
        };
    } catch (error) {
        if (error.message.includes('CEP')) {
            throw error;
        }
        throw new Error('Erro ao buscar CEP. Tente novamente.');
    }
}

/**
 * Formata distância para exibição
 * @param {number} km - Distância em quilômetros
 * @returns {string} Distância formatada
 */
export function formatarDistancia(km) {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
}
