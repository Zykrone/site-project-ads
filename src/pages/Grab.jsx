import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Activity, Database } from 'lucide-react';
import './Dashboard.css';

export default function Grab() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container cyber-grid-bg">
      <nav className="dashboard-nav">
        <button onClick={() => navigate('/')} className="nav-btn">
          <ArrowLeft size={20} /> RETOUR AU TERMINAL
        </button>
        <div className="nav-title">
          <Cpu className="text-blue" size={24} />
          <h2>GRAB <span className="text-blue">INTERFACE</span></h2>
        </div>
        <div className="nav-status text-blue">STATUT: ACTIF</div>
      </nav>

      <main className="dashboard-content">
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>BIENVENUE SUR LA GRAB</h1>
          <p>Système de gestion publique et outils opérationnels</p>
        </motion.div>

        <div className="dashboard-grid">
          <motion.div 
            className="cyber-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Activity className="card-icon text-blue" size={32} />
            <h3>Flux de Données</h3>
            <p>Monitorez les opérations en cours.</p>
            <button className="btn-cyber mt-4">CONSULTER</button>
          </motion.div>

          <motion.div 
            className="cyber-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Database className="card-icon text-blue" size={32} />
            <h3>Ressources</h3>
            <p>Accès aux bases de données Grab.</p>
            <button className="btn-cyber mt-4">ACCÉDER</button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
