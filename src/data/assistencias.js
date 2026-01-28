/**
 * Dados das Assistências Técnicas filiadas à Select Parts
 * Endereços genéricos para demonstração
 */

export const assistencias = [
    {
        id: 1,
        nome: "Assistência Técnica Joinville",
        cidade: "Joinville",
        estado: "SC",
        endereco: "Rua das Indústrias, 1234 - Zona Industrial Norte, Joinville - SC, 89219-530",
        telefone: "(47) 3433-1100",
        especialidade: "Compressores de Parafuso e Manutenção Industrial",
        logo: "/image.png",
        coords: { lat: -26.3045, lng: -48.8487 }
    },
    {
        id: 2,
        nome: "Assistência Técnica Blumenau",
        cidade: "Blumenau",
        estado: "SC",
        endereco: "Av. Brasil, 5678 - Garcia, Blumenau - SC, 89020-400",
        telefone: "(47) 3322-2200",
        especialidade: "Compressores de Pistão e Sistemas Pneumáticos",
        logo: "/image.png",
        coords: { lat: -26.9195, lng: -49.0661 }
    },
    {
        id: 3,
        nome: "Assistência Técnica Curitiba",
        cidade: "Curitiba",
        estado: "PR",
        endereco: "Rua Marechal Deodoro, 910 - Centro, Curitiba - PR, 80010-010",
        telefone: "(41) 3233-3300",
        especialidade: "Compressores Centrífugos e Alta Pressão",
        logo: "/image.png",
        coords: { lat: -25.4290, lng: -49.2671 }
    }
];

/**
 * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
 * @param {number} lat1 - Latitude do ponto 1
 * @param {number} lng1 - Longitude do ponto 1
 * @param {number} lat2 - Latitude do ponto 2
 * @param {number} lng2 - Longitude do ponto 2
 * @returns {number} Distância em quilômetros
 */
export function calcularDistancia(lat1, lng1, lat2, lng2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Ordena assistências por proximidade do usuário
 * @param {Array} assistencias - Lista de assistências
 * @param {number} userLat - Latitude do usuário
 * @param {number} userLng - Longitude do usuário
 * @returns {Array} Assistências ordenadas por distância
 */
export function ordenarPorProximidade(assistencias, userLat, userLng) {
    return [...assistencias]
        .map(a => ({
            ...a,
            distancia: calcularDistancia(userLat, userLng, a.coords.lat, a.coords.lng)
        }))
        .sort((a, b) => a.distancia - b.distancia);
}
