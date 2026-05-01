import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Database, Lock, Key, Fingerprint, AtSign, ChevronRight } from 'lucide-react';
import './Landing.css';

export default function Landing() {
  const { login, registerRequest, currentUser } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('initial'); 
  const [formData, setFormData] = useState({ id: '', password: '', discordId: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.discordId || !formData.id || !formData.password) return setError('Informations incomplètes.');
    const type = view === 'register_ads' ? 'RÉSEAU' : 'GRAB';
    registerRequest(formData.id, formData.password, formData.discordId, type);
    setSuccess('TRANSMISSION RÉUSSIE : Demande envoyée au centre.');
    setTimeout(() => setView('login'), 3000);
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
            <div className="hero-content">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="hero-title"
              >
                GESTION HUB
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
                <h2>{view === 'login' ? 'IDENTIFICATION' : 'LAISON CENTRE'}</h2>
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
                      placeholder="Votre pseudo actuel..."
                      value={formData.discordId}
                      onChange={e => setFormData({...formData, discordId: e.target.value})}
                    />
                  </div>
                )}

                <button type="submit" className="btn-tech w-full" style={{ padding: '25px', fontSize: '1.1rem' }}>
                  {view === 'login' ? 'DÉVERROUILLER L\'ACCÈS' : 'TRANSMETTRE LA DEMANDE'} <ChevronRight size={18} />
                </button>
              </form>

              <div className="auth-footer-tech" style={{ marginTop: '60px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
                {view === 'login' ? null : (
                  <button className="text-btn" onClick={() => {setView('login'); setError(''); setSuccess('');}} style={{ background: 'none', color: '#fff', opacity: 0.7, fontSize: '1rem', fontWeight: 700 }}>
                    RETOUR AU PORTAIL
                  </button>
                )}
                <button className="total-reset-tech" onClick={() => setView('initial')} style={{ display: 'block', margin: '30px auto 0', opacity: 0.3, background: 'none', color: '#fff', fontSize: '0.8rem' }}>ANNULER L'OPÉRATION</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Signup Button */}
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
              onClick={() => setView('register_ads')}
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
