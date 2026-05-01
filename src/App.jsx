import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Panel from './pages/Panel';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="cyber-grid-bg"></div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/panel/*" element={<Panel />} />
        </Routes>
        <div className="zykrone-signature" data-text="Fait par Zykrøne">
          Fait par Zykrøne
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
