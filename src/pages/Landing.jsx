import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Database, ChevronRight } from 'lucide-react';
import './Landing.css';

export default function Landing() {
  const { login, registerRequest } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('initial'); 
  const [formData, setFormData] = useState({ id: '', password: '', discordId: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty('--mouse-x', `${mousePos.x}%`);
      container.style.setProperty('--mouse-y', `${mousePos.y}%`);
    }
  }, [mousePos]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.password) return setError('Champs requis.');
    const ok = login(formData.id, formData.password);
    if (!ok) setError('ACCÈS REFUSÉ : Identifiants invalides.');
    else navigate('/panel');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!formData.discordId || !formData.id || !formData.password) return setError('Informations incomplètes.');
    
    setLoading(true);
    const type = view === 'register_ads' ? 'RÉSEAU' : 'GRAB';
    try {
      await registerRequest(formData.id, formData.password, formData.discordId, type);
      setSuccess('TRANSMISSION RÉUSSIE : Demande envoyée au centre.');
      setTimeout(() => {
        setView('login');
        setLoading(false);
      }, 3000);
    } catch {
      setError('ERREUR DE TRANSMISSION');
      setLoading(false);
    }
  };

  return (
    <div className="tech-landing" ref={containerRef} onMouseMove={handleMouseMove}>
      <AnimatePresence mode="wait">
        {view === 'initial' ? (
          <motion.div 
            key="initial"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="hero-section"
          >
            <div className="text-center mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="hero-title"
              >
                GESTION ADS
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="hero-desc"
              >
                L'interface technologique de nouvelle génération pour la gestion et l'acquisition de données.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="portal-grid"
            >
              <PortalCard 
                icon={<Shield size={48} />}
                title="RÉSEAU"
                desc="Promotion Stratégique"
                onClick={() => setView('login')}
                color="cyan"
                delay={0.6}
              />
              <PortalCard 
                icon={<Database size={48} />}
                title="GRAB"
                desc="Acquisition Membres"
                onClick={() => setView('login')}
                color="blue"
                delay={0.7}
              />
            </motion.div>
          </motion.div>
        ) : view === 'register_choice' ? (
          <motion.div 
            key="choice"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="auth-container"
          >
            <div className="auth-card-tech">
              <div className="auth-header-tech">
                <h2>CHOIX DE LA BRANCHE</h2>
                <p>Sélectionnez votre unité opérationnelle pour soumettre votre demande.</p>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                <button 
                  className="btn-tech" 
                  style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}
                  onClick={() => setView('register_ads')}
                >
                  <Shield size={32} />
                  <span>RÉSEAU</span>
                </button>
                <button 
                  className="btn-tech" 
                  style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', borderColor: '#0066ff' }}
                  onClick={() => setView('register_grab')}
                >
                  <Database size={32} />
                  <span>GRAB</span>
                </button>
              </div>

              <div className="auth-footer-clean">
                <button onClick={() => setView('initial')} className="back-btn-minimal">RETOUR</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="auth"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="auth-container"
          >
            <div className="auth-card-tech">
              <div className="auth-header-tech">
                <h2>{view === 'login' ? 'IDENTIFICATION' : 'LIAISON CENTRE'}</h2>
                <p>{view === 'login' ? 'Accédez au centre de commande.' : 'Enregistrez votre unité opérationnelle.'}</p>
              </div>

              {error && <div className="tech-alert error">{error}</div>}
              {success && <div className="tech-alert success">{success}</div>}

              <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="tech-form">
                <div className="tech-group mb-8">
                  <label>{view === 'login' ? 'PSEUDO OU ID DISCORD' : 'ID DISCORD (NUMÉRIQUE)'}</label>
                  <input 
                    className="tech-input"
                    type="text" 
                    placeholder={view === 'login' ? "Votre pseudo..." : "Ex: 74539..."}
                    value={formData.id}
                    onChange={e => setFormData({...formData, id: e.target.value})}
                  />
                </div>

                <div className="tech-group mb-8">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label>CLÉ D'ACCÈS</label>
                    {view === 'login' && (
                      <button 
                        type="button" 
                        onClick={() => setError('Contactez un Gérant ou l\'Univers pour réinitialiser votre clé.')}
                        style={{ background: 'none', color: 'var(--tech-cyan)', fontSize: '0.7rem', opacity: 0.6, fontWeight: 700 }}
                      >
                        MOT DE PASSE OUBLIÉ ?
                      </button>
                    )}
                  </div>
                  <input 
                    className="tech-input"
                    type="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                {(view === 'register_ads' || view === 'register_grab') && (
                  <div className="tech-group mb-8">
                    <label>PSEUDO DISCORD (AFFICHAGE)</label>
                    <input 
                      className="tech-input"
                      type="text" 
                      placeholder="Ex: Zykrone"
                      value={formData.discordId}
                      onChange={e => setFormData({...formData, discordId: e.target.value})}
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-tech w-full" 
                  style={{ padding: '25px', fontSize: '1.1rem', opacity: loading ? 0.5 : 1 }}
                  disabled={loading}
                >
                  {loading ? 'TRANSMISSION EN COURS...' : (view === 'login' ? 'DÉVERROUILLER L\'ACCÈS' : 'TRANSMETTRE LA DEMANDE')} <ChevronRight size={18} />
                </button>
              </form>

              <div className="auth-footer-clean">
                <button 
                  onClick={() => {setView('initial'); setError(''); setSuccess('');}}
                  className="back-btn-minimal"
                >
                  ANNULER L'OPÉRATION
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'initial' && (
          <motion.div 
            className="floating-signup-wrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <motion.button 
              className="signup-btn-premium"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--tech-glow)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('register_choice')}
            >
              <div className="signup-btn-inner">
                <Shield size={20} className="signup-icon" />
                <span>CRÉER UN COMPTE</span>
              </div>
              <div className="signup-btn-glow"></div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PortalCard({ icon, title, desc, onClick, color, delay }) {
  return (
    <motion.div 
      className={`portal-item ${color}`} 
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.05, translateY: -10 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="portal-main">
        <div className="portal-icon-tech">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="portal-action">ACCÉDER <ChevronRight size={16} /></div>
    </motion.div>
  );
}
