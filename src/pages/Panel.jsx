import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Users, LogOut, Zap, Database, 
  Terminal, BookOpen, Menu, Bell, Hexagon, Globe
} from 'lucide-react';
import GestionHub from './GestionHub';
import GestionGRAB from './GestionGRAB';
import Formation from './Formation';
import Recrutement from './Recrutement';
import Membres from './Membres';
import Security from './Security';
import './Panel.css';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    style={{ height: '100%' }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute = ({ children, allowedRoles, allowedBranch }) => {
  const { currentUser, ROLES, getBranch } = useAuth();
  if (!currentUser) return <Navigate to="/" />;
  
  const userRole = currentUser.role;
  const userBranch = getBranch(userRole);

  if (userRole === ROLES.UNIVERS || userBranch === 'ALL') return children;

  if (allowedBranch && userBranch !== allowedBranch) {
    return (
      <PageTransition>
        <div className="denied-view">
          <div className="card-tech text-center" style={{ maxWidth: '600px' }}>
            <Shield size={100} className="glow-tech mb-8" />
            <h2 style={{ fontSize: '3rem' }}>BRANCHE_DENIED</h2>
            <p className="mt-8" style={{ color: 'var(--text-soft)', fontSize: '1.2rem' }}>
              Cette zone appartient à une autre gestion opérationnelle.
            </p>
            <Link to="/panel" className="btn-tech mt-8">RETOURNER AU SECTEUR</Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
     return (
      <PageTransition>
        <div className="denied-view">
          <div className="card-tech text-center" style={{ maxWidth: '600px' }}>
            <Shield size={100} className="glow-tech mb-8" />
            <h2 style={{ fontSize: '3rem' }}>ACCÈS_INSUFFISANT</h2>
            <p className="mt-8" style={{ color: 'var(--text-soft)', fontSize: '1.2rem' }}>
              Grade insuffisant pour accéder à ces protocoles.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return children;
};

export default function Panel() {
  const { currentUser, logout, ROLES, setMyRole, getBranch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser, navigate]);

  if (!currentUser) return <div className="main-panel" style={{ background: 'var(--bg-vault)', height: '100vh', width: '100vw' }}></div>;

  const handleLogout = () => { logout(); navigate('/'); };
  const role = currentUser.role;
  const branch = getBranch(role);

  const canSeeReseau = branch === 'RESEAU' || branch === 'ALL';
  const canSeeGrab   = branch === 'GRAB' || branch === 'ALL';
  const isAdmin = [ROLES.UNIVERS, ROLES.GERANT_RESEAU, ROLES.GERANT_GRAB, ROLES.CHEF_RESEAU, ROLES.CHEF_GRAB].includes(role);
  const isSeniorPlus = [
    ROLES.UNIVERS, 
    ROLES.GERANT_RESEAU, ROLES.GERANT_GRAB, 
    ROLES.CHEF_RESEAU, ROLES.CHEF_GRAB, 
    ROLES.SENIOR_RESEAU, ROLES.SENIOR_GRAB
  ].includes(role);

  const activeClass = (path) => `tech-nav-link ${location.pathname === path ? 'active' : ''}`;

  return (
    <div className="main-panel">
      <header className="tech-header">
        <div className="header-inner">
          <Link to="/panel" className="tech-logo">
            <div className="logo-icon"><Hexagon size={24} /></div>
            <div className="logo-text">GESTION<span>ADS</span></div>
          </Link>

          <nav className="header-nav">
            {canSeeReseau && (
              <Link to="/panel" className={activeClass('/panel')}>RÉSEAU</Link>
            )}
            {canSeeGrab && (
              <Link to="/panel/grab" className={activeClass('/panel/grab')}>GRAB</Link>
            )}
            {isAdmin && (
              <Link to="/panel/membres" className={activeClass('/panel/membres')}>EFFECTIFS</Link>
            )}
          </nav>

          <div className="header-actions">
            <div className="profile-pill">
              <div className="profile-info">
                <span className="profile-name">{currentUser.name}</span>
                {currentUser.role === ROLES.UNIVERS ? (
                  <select 
                    value={currentUser.role} 
                    onChange={(e) => setMyRole(e.target.value)}
                    className="role-pill-select"
                    style={{ background: 'none', border: 'none', color: 'var(--tech-cyan)', fontWeight: 800, fontSize: '0.7rem', cursor: 'pointer', outline: 'none' }}
                  >
                    {Object.values(ROLES).map(r => (
                      <option key={r} value={r} style={{ background: '#050608', color: '#fff' }}>{r}</option>
                    ))}
                  </select>
                ) : (
                  <span className="profile-role">{role}</span>
                )}
              </div>
              <button className="logout-btn" onClick={handleLogout}><LogOut size={16} /></button>
            </div>
          </div>
        </div>
      </header>

      <main className="panel-body">
        <div className="panel-container">
          <div className="secondary-nav">
             <Link to="/panel/formation" className={`secondary-link ${location.pathname.includes('formation') ? 'active' : ''}`}>GUIDES PRATIQUES</Link>
             {isSeniorPlus && (
               <Link to="/panel/recrutement" className={`secondary-link ${location.pathname.includes('recrutement') ? 'active' : ''}`}>PÔLE RECRUTEMENT</Link>
             )}
             <Link to="/panel/securite" className={`secondary-link ${location.pathname.includes('securite') ? 'active' : ''}`}>SÉCURITÉ</Link>
          </div>

          <div className="view-content">
            <AnimatePresence mode="wait">
              <Routes key={location.pathname}>
                <Route path="/" element={
                  branch === 'GRAB' ? <Navigate to="/panel/grab" /> :
                  <ProtectedRoute allowedBranch="RESEAU"><PageTransition><GestionHub /></PageTransition></ProtectedRoute>
                } />
                <Route path="grab" element={<ProtectedRoute allowedBranch="GRAB"><PageTransition><GestionGRAB /></PageTransition></ProtectedRoute>} />
                <Route path="formation" element={<PageTransition><Formation /></PageTransition>} />
                <Route path="recrutement" element={
                  <ProtectedRoute allowedRoles={[
                    ROLES.UNIVERS, 
                    ROLES.GERANT_RESEAU, ROLES.GERANT_GRAB, 
                    ROLES.CHEF_RESEAU, ROLES.CHEF_GRAB, 
                    ROLES.SENIOR_RESEAU, ROLES.SENIOR_GRAB
                  ]}>
                    <PageTransition><Recrutement /></PageTransition>
                  </ProtectedRoute>
                } />
                <Route path="membres" element={<ProtectedRoute allowedRoles={[ROLES.UNIVERS, ROLES.GERANT_RESEAU, ROLES.GERANT_GRAB, ROLES.CHEF_RESEAU, ROLES.CHEF_GRAB]}><PageTransition><Membres /></PageTransition></ProtectedRoute>} />
                <Route path="securite" element={<PageTransition><Security /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
