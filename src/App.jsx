import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Panel from './pages/Panel';
import './index.css';

function AppContent() {
  const { loading } = useAuth();

  useEffect(() => {
    // Une fois que React est monté, on cache le loading screen de l'index.html
    if (window.hideLoadingScreen) {
      window.hideLoadingScreen();
    }
  }, []);

  return (
    <>
      <div className="cyber-grid-bg"></div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/panel/*" element={<Panel />} />
      </Routes>
      <div className="zykrone-signature" data-text="Fait par Zykrøne">
        Fait par Zykrøne
      </div>
      {loading && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#0a0a0a',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '20px', color: '#00f0ff',
          fontFamily: 'monospace', fontSize: '1.2rem'
        }}>
          <div style={{
            width: '50px', height: '50px',
            border: '3px solid rgba(0,240,255,0.1)',
            borderTopColor: '#00f0ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span>CONNEXION AU RÉSEAU SÉCURISÉ...</span>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
