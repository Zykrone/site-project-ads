import React from 'react';
import { motion } from 'framer-motion';
import { Target, Database, Zap, ShieldCheck, AlertCircle, Info, ChevronRight, Camera, MessageCircle, BarChart3 } from 'lucide-react';

export default function GestionGRAB() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="view-container" style={{ paddingBottom: '100px' }}>
      
      {/* Header Panel */}
      <motion.div variants={item} className="text-center mb-16">
        <div className="badge mx-auto">UNITÉ D'ACQUISITION</div>
        <h1 style={{ fontSize: '5rem' }}>UNITÉ <span className="title-grad">GRAB</span></h1>
        <p style={{ color: 'var(--text-soft)', fontSize: '1.4rem', marginTop: '15px' }}>Méthode complète d'infiltration et d'invitation.</p>
      </motion.div>

      {/* Quotas & Goals Grid */}
      <div className="tech-grid mb-12">
        <motion.div variants={item} className="card-tech" style={{ gridColumn: 'span 2' }}>
           <h2 className="mb-8" style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '2.5rem' }}>
              <Target className="glow-tech" size={40} /> QUOTAS DE GRADES
           </h2>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <ul style={{ lineHeight: '2.8', fontSize: '1.2rem' }}>
                <li>✨ <strong>Royal</strong> : 550 grabs</li>
                <li>🫧 <strong>Bubulle</strong> : 400 grabs</li>
                <li>❄️ <strong>Flocon</strong> : 300 grabs</li>
                <li>☘ <strong>Trèfle</strong> : 210 grabs</li>
              </ul>
              <ul style={{ lineHeight: '2.8', fontSize: '1.2rem' }}>
                <li>☀️ <strong>Soleil</strong> : 160 grabs</li>
                <li>💷 <strong>Billet</strong> : 100 grabs</li>
                <li>👤 <strong>Owner</strong> : 70 grabs</li>
                <li>👥 <strong>Co-Owner</strong> : 45 grabs</li>
              </ul>
           </div>
           <div style={{ marginTop: '40px', padding: '25px', background: 'rgba(0,210,255,0.08)', borderRadius: '25px', border: '1px solid var(--tech-cyan)' }}>
              <p style={{ color: 'var(--tech-cyan)', fontWeight: 900, fontSize: '1.2rem', textAlign: 'center' }}>
                🎯 OBJECTIF : 30 grabs minimum toutes les 2 semaines pour garder son grade.
              </p>
           </div>
        </motion.div>

        <motion.div variants={item} className="card-tech" style={{ padding: '40px' }}>
           <div className="icon-box cyan" style={{ marginBottom: '30px' }}><MessageCircle size={32} /></div>
           <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>PROTOCOLES MP</h3>
           <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: '1.8', marginBottom: '20px' }}>
             Utilisez l'extraction vocale pour créer un lien avant de DM. Le taux de réussite est <span style={{ color: 'var(--tech-cyan)', fontWeight: 900 }}>4x supérieur</span>.
           </p>
           <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', fontSize: '0.9rem', color: 'var(--text-soft)' }}>
              DM un gérant pour toute question sur l'extraction.
           </div>
        </motion.div>
      </div>

      {/* Modules Concrets */}
      <div className="tech-grid">
        <motion.div variants={item} className="card-tech" style={{ padding: '40px' }}>
          <div className="icon-box cyan" style={{ marginBottom: '25px' }}><Camera size={28} /></div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>SÉCURITÉ AVATAR</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)', lineHeight: '1.8' }}>Optimisation des comptes pour une crédibilité maximale (photo, bio, pseudo).</p>
        </motion.div>

        <motion.div variants={item} className="card-tech" style={{ padding: '40px' }}>
          <div className="icon-box cyan" style={{ marginBottom: '25px' }}><BarChart3 size={28} /></div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>LOGS D'ACQUISITION</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)', lineHeight: '1.8' }}>Suivi quotidien des MP envoyés et des intégrations réussies sur Shibuya.</p>
        </motion.div>

        <motion.div variants={item} className="card-tech" style={{ padding: '40px', borderColor: 'rgba(255,45,85,0.3)', background: 'rgba(255,45,85,0.03)' }}>
          <div className="icon-box" style={{ background: 'rgba(255,45,85,0.2)', color: '#ff2d55', marginBottom: '25px' }}><AlertCircle size={28} /></div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '15px', color: '#ff2d55' }}>ZONE ROUGE</h3>
          <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: '1.8' }}>NE JAMAIS partager de lien en public. Alerte de sécurité instantanée si détecté.</p>
        </motion.div>
      </div>

    </motion.div>
  );
}
