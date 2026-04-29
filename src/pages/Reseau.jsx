import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Users, Lock, Server } from 'lucide-react';
import './Dashboard.css';

export default function Reseau() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container cyber-grid-bg">
      <nav className="dashboard-nav nav-cyan">
        <button onClick={() => navigate('/')} className="nav-btn nav-btn-cyan">
          <ArrowLeft size={20} /> DÉCONNEXION
        </button>
        <div className="nav-title">
          <Shield className="text-cyan glow-text" size={24} />
          <h2>RÉSEAU <span className="text-cyan">SENIOR</span></h2>
        </div>
        <div className="nav-status text-cyan glow-text">CONNEXION SÉCURISÉE</div>
      </nav>

      <main className="dashboard-content">
        <motion.div 
          className="dashboard-header header-cyan"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>ACCÈS AUTORISÉ : GESTION SENIOR</h1>
          <p>Supervision des réseaux, gestions des accès et contrôle système.</p>
        </motion.div>

        <div className="dashboard-grid">
          <motion.div 
            className="cyber-card card-cyan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Users className="card-icon text-cyan" size={32} />
            <h3>Gestion des Effectifs</h3>
            <p>Contrôle des privilèges et accès du personnel.</p>
            <button className="btn-cyber btn-cyan mt-4">GÉRER</button>
          </motion.div>

          <motion.div 
            className="cyber-card card-cyan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Server className="card-icon text-cyan" size={32} />
            <h3>Serveurs Shibuya</h3>
            <p>État des infrastructures et maintenance.</p>
            <button className="btn-cyber btn-cyan mt-4">SUPERVISER</button>
          </motion.div>
          
          <motion.div 
            className="cyber-card card-cyan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Lock className="card-icon text-cyan" size={32} />
            <h3>Protocoles de Sécurité</h3>
            <p>Journaux d'audit et configuration des pare-feux.</p>
            <button className="btn-cyber btn-cyan mt-4">EXAMINER</button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
