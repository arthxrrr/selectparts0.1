import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import HomePage from './pages/HomePage';
import QuemSomosPage from './pages/QuemSomosPage';
import AssistenciasPage from './pages/AssistenciasPage';
import CapacitacaoPage from './pages/CapacitacaoPage';
import SejaParceiroPage from './pages/SejaParceiroPage';
import './styles/global.css';

/**
 * App - Componente principal da aplicação
 * Configura rotas e layout global
 */
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quem-somos" element={<QuemSomosPage />} />
          <Route path="/assistencias" element={<AssistenciasPage />} />
          <Route path="/capacitacao" element={<CapacitacaoPage />} />
          <Route path="/seja-parceiro" element={<SejaParceiroPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
}

export default App;
