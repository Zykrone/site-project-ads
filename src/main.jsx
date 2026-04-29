import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('App crash:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
          background: '#050608',
          color: '#fff',
          fontFamily: 'monospace',
          textAlign: 'center',
          gap: '20px'
        }}>
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h2 style={{ color: '#ff2d55', fontSize: '1.2rem' }}>ERREUR DE CHARGEMENT</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', maxWidth: '400px', lineHeight: 1.6 }}>
            {this.state.error?.message || 'Une erreur inattendue s\'est produite.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '10px',
              padding: '12px 30px',
              background: '#00d2ff',
              color: '#000',
              border: 'none',
              borderRadius: '100px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            RÉESSAYER
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

