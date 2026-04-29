import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Cpu, Terminal, AtSign, Check, X, 
  UserMinus, ChevronDown, Shield, User,
  Zap, Globe, Target, Star, Users, Trash2, RefreshCcw, Copy
} from 'lucide-react';

const TechSelect = ({ value, options = [], onChange, disabledOptions = [], disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsOpen(!isOpen);
  };

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 5, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            width: coords.width,
            zIndex: 999999, // Au-dessus de ABSOLUMENT TOUT
            background: '#0a0a0f',
            border: '1px solid var(--tech-cyan)',
            borderRadius: '15px',
            padding: '8px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
            pointerEvents: 'auto'
          }}
        >
          {options.map(option => {
            const isDisabled = disabledOptions.includes(option);
            return (
              <div 
                key={option}
                onClick={() => {
                  if (!isDisabled) {
                    onChange(option);
                    setIsOpen(false);
                  }
                }}
                style={{
                  padding: '12px 15px',
                  borderRadius: '10px',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.3 : 1,
                  background: value === option ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
                  color: value === option ? 'var(--tech-cyan)' : '#fff',
                  transition: 'all 0.2s ease',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ width: '20px', display: 'flex', justifyContent: 'center' }}>
                  {option === 'Univers' && <Shield size={14} />}
                  {(option.includes('Chef') || option.includes('Gérant')) && <Star size={14} />}
                  {option.includes('Réseau') && <Globe size={14} />}
                  {option.includes('Grab') && <Target size={14} />}
                  {(!option.includes('Chef') && !option.includes('Gérant') && !option.includes('Réseau') && !option.includes('Grab')) && <User size={14} />}
                </div>
                {option}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="tech-select-container" ref={containerRef} style={{ width: '220px' }}>
      <button 
        onClick={toggleDropdown}
        style={{
          width: '100%',
          padding: '12px 20px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: isOpen ? '1px solid var(--tech-cyan)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '0.85rem',
          fontWeight: 600,
          transition: 'all 0.3s ease'
        }}
      >
        <span>{value || 'Sélectionner...'}</span>
        <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} />
      </button>
      {createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default function Membres() {
  const auth = useAuth();
  if (!auth) return <div className="view-container">Initialisation du système...</div>;

  const { 
    currentUser,
    users = [], 
    pendingRequests = [], 
    acceptRequest, 
    rejectRequest, 
    changeUserRole, 
    kickUser,
    canManageRoles,
    canAssignRole,
    setMyRole,
    resetUserPassword,
    ROLES = {},
    getBranch
  } = auth;

  const [resetResult, setResetResult] = useState(null);

  if (!canManageRoles || !canManageRoles()) {
    return (
      <div className="view-container">
        <div className="card-tech text-center" style={{ padding: '80px' }}>
          <ShieldAlert size={80} className="glow-tech mx-auto mb-8" />
          <h2 style={{ fontSize: '3rem' }}>SÉCURITÉ NIVEAU 5</h2>
          <p style={{ marginTop: '20px', color: 'var(--text-soft)', fontSize: '1.2rem' }}>
            Accès refusé. Seuls les administrateurs peuvent gérer les effectifs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-container" style={{ padding: '20px 0 100px' }}>
      <AnimatePresence>
        {resetResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="card-tech"
              style={{ maxWidth: '500px', width: '100%', textAlign: 'center', border: '1px solid var(--tech-cyan)' }}
            >
              <div className="logo-icon mx-auto mb-6" style={{ background: 'var(--tech-cyan)', width: '60px', height: '60px' }}>
                <RefreshCcw size={30} />
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>RÉINITIALISATION RÉUSSIE</h2>
              <p style={{ color: 'var(--text-soft)', marginBottom: '30px' }}>
                Nouveau code d'accès généré pour <strong>{resetResult.name}</strong> :
              </p>
              
              <div style={{ 
                background: 'rgba(0, 210, 255, 0.1)', 
                padding: '20px', 
                borderRadius: '15px', 
                border: '1px dashed var(--tech-cyan)',
                fontSize: '2rem',
                fontWeight: 900,
                letterSpacing: '5px',
                color: 'var(--tech-cyan)',
                marginBottom: '30px',
                cursor: 'pointer'
              }}
              onClick={() => {
                navigator.clipboard.writeText(resetResult.password);
                alert('Code copié !');
              }}
              >
                {resetResult.password}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '30px' }}>
                Communiquez ce code au gestionnaire. Il pourra le changer dans ses paramètres de sécurité.
              </p>

              <button className="btn-tech w-full" onClick={() => setResetResult(null)}>COMPRIS</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Section */}
      <section className="card-tech mb-12">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
           <div className="logo-icon" style={{ background: 'var(--tech-cyan)', width: '50px', height: '50px' }}><Zap size={24} /></div>
           <h2 style={{ fontSize: '2rem' }}>LOGS DE RECRUTEMENT ({pendingRequests?.length || 0})</h2>
        </div>
        
        {(!pendingRequests || pendingRequests.length === 0) ? (
          <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '25px' }}>
            <p style={{ opacity: 0.5, fontSize: '1.3rem' }}>Aucune donnée en attente de traitement.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>PSEUDO</th>
                  <th>BRANCHE</th>
                  <th>ID DISCORD</th>
                  <th style={{ textAlign: 'right' }}>DÉCISION</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 800, fontSize: '1.1rem' }}>{req.pseudo || 'N/A'}</td>
                    <td>
                      <span style={{ 
                        color: req.type === 'RÉSEAU' ? 'var(--tech-cyan)' : '#ff2d55', 
                        fontWeight: 900,
                        background: 'rgba(255,255,255,0.05)',
                        padding: '6px 18px',
                        borderRadius: '100px',
                        fontSize: '0.85rem'
                      }}>
                        {req.type}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '1.1rem' }}>
                        <AtSign size={18} /> {req.discordId || 'N/A'}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn-tech"
                          style={{ padding: '12px 30px', fontSize: '0.85rem' }}
                          onClick={() => acceptRequest(req.id, req.type === 'RÉSEAU' ? ROLES.GESTION_RESEAU : ROLES.GESTION_GRAB)}
                        >
                           ADMETTRE
                        </button>
                        <button 
                          className="logout-btn"
                          style={{ width: '50px', height: '50px' }}
                          onClick={() => rejectRequest(req.id)}
                        >
                           <X size={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Active Section */}
      <section className="card-tech">
         <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
           <div className="logo-icon" style={{ background: '#fff', color: '#000', width: '50px', height: '50px' }}><Users size={24} /></div>
           <h2 style={{ fontSize: '2rem' }}>EFFECTIFS ACTIFS ({users?.length || 0})</h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>PSEUDO</th>
                <th>ID DISCORD</th>
                <th>GRADE ACTUEL</th>
                <th>MODIFICATION</th>
                <th style={{ textAlign: 'right' }}>ACTION CRITIQUE</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 800, fontSize: '1.1rem' }}>{u.name || u.id}</td>
                  <td style={{ opacity: 0.7, fontSize: '1.1rem' }}>{u.discordId || '---'}</td>
                  <td>
                    <span style={{ 
                      padding: '8px 20px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '100px', 
                      fontSize: '0.9rem', 
                      fontWeight: 900,
                      color: u.role === ROLES.UNIVERS ? 'var(--tech-cyan)' : '#fff'
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <TechSelect 
                      value={u.role}
                      options={Object.values(ROLES)}
                      disabledOptions={Object.values(ROLES).filter(r => !canAssignRole(r))}
                      onChange={(newRole) => {
                        changeUserRole(u.id, newRole);
                        if (currentUser && u.id === currentUser.id && currentUser.name === 'Univers') {
                          setMyRole(newRole);
                        }
                      }}
                    />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button 
                        className="btn-tech"
                        style={{ 
                          background: 'rgba(0, 210, 255, 0.1)', 
                          border: '1px solid rgba(0, 210, 255, 0.3)',
                          color: 'var(--tech-cyan)',
                          padding: '12px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.8rem',
                          fontWeight: 800
                        }}
                        onClick={() => {
                          const newPass = resetUserPassword(u.id);
                          setResetResult({ name: u.name || u.id, password: newPass });
                        }}
                      >
                        <RefreshCcw size={16} /> RÉINITIALISER
                      </button>

                      {u.id !== currentUser.id && (
                        <button 
                          className="btn-tech"
                          style={{ 
                            background: 'rgba(255, 45, 85, 0.1)', 
                            border: '1px solid rgba(255, 45, 85, 0.3)',
                            color: '#ff2d55',
                            padding: '12px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '0.8rem',
                            fontWeight: 800
                          }}
                          onClick={() => {
                            if (window.confirm(`EXPULSION DÉFINITIVE : Voulez-vous vraiment bannir ${u.name || u.id} ?`)) {
                              kickUser(u.id);
                            }
                          }}
                        >
                          <UserMinus size={16} /> EXPULSER
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
