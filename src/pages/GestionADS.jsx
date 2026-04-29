import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, MessageCircle, ExternalLink, Image as ImageIcon, BarChart3 } from 'lucide-react';

export default function GestionADS() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="view-container" style={{ paddingBottom: '100px' }}>
      
      {/* Header Panel */}
      <motion.div variants={item} className="text-center mb-16">
        <div className="badge mx-auto">UNITÉ DE PRODUCTION</div>
        <h1 style={{ fontSize: '5rem' }}>UNITÉ <span className="title-grad">RÉSEAU</span></h1>
        <p style={{ color: 'var(--text-soft)', fontSize: '1.4rem', marginTop: '15px' }}>Supervision des campagnes et objectifs de croissance.</p>
      </motion.div>

      {/* Quotas & Goals Grid */}
      <div className="tech-grid mb-12">
        <motion.div variants={item} className="card-tech" style={{ gridColumn: 'span 2' }}>
           <h2 className="mb-8" style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '2.5rem' }}>
              <TrendingUp className="glow-tech" size={40} /> GRADES PAR VUES
           </h2>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <ul style={{ lineHeight: '2.8', fontSize: '1.2rem' }}>
                <li>👑 <strong>Co Owner</strong> : 5 000 vues</li>
                <li>🏆 <strong>Owner</strong> : 10 000 vues</li>
                <li>💎 <strong>Diamant</strong> : 15 000 vues</li>
                <li>💸 <strong>Billet</strong> : 25 000 vues</li>
              </ul>
              <ul style={{ lineHeight: '2.8', fontSize: '1.2rem' }}>
                <li>☀️ <strong>Soleil</strong> : 50 000 vues</li>
                <li>🍀 <strong>Trèfle</strong> : 100 000 vues</li>
                <li>❄️ <strong>Flocon</strong> : 300 000 vues</li>
                <li>🫧 <strong>Bubulle</strong> : 700 000 vues</li>
                <li>💎 <strong>Royal</strong> : 1 000 000 vues</li>
              </ul>
           </div>
           <div style={{ marginTop: '40px', padding: '25px', background: 'rgba(255,45,85,0.08)', borderRadius: '25px', border: '1px solid rgba(255,45,85,0.2)' }}>
              <p style={{ color: '#ff2d55', fontWeight: 900, fontSize: '1.2rem', textAlign: 'center' }}>
                ⚠️ QUOTA MINIMUM : 3 500 vues par semaine. Sanction immédiate si non atteint.
              </p>
           </div>
        </motion.div>

        {/* NOUVEAU MODULE SUIVI AU LIEU DE MISSION SMR */}
        <motion.div variants={item} className="card-tech" style={{ padding: '40px', borderLeft: '8px solid var(--tech-cyan)' }}>
           <h3 className="mb-6" style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.8rem' }}><ImageIcon size={28} className="glow-tech" /> SUIVI RÉSEAU</h3>
           <p style={{ fontSize: '1.3rem', color: '#fff', lineHeight: '1.8', marginBottom: '20px' }}>
             Mettre un <span style={{ fontWeight: 900, textDecoration: 'underline' }}>screen de vos vues</span> dans votre salon perso chaque jour.
           </p>
           <div style={{ padding: '15px', background: 'rgba(0,210,255,0.03)', borderRadius: '15px', fontSize: '1rem', color: 'var(--tech-cyan)', fontWeight: 800 }}>
              C'est la seule façon de valider vos quotas.
           </div>
        </motion.div>
      </div>

      {/* Modules Concrets */}
      <div className="tech-grid">
        <motion.div variants={item} className="card-tech" style={{ padding: '40px' }}>
          <div className="icon-box blue" style={{ marginBottom: '25px' }}><Rocket size={28} /></div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>LANCEMENT VIDÉO</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)', lineHeight: '1.8' }}>
            Publiez vos vidéos entre <span style={{ color: '#fff', fontWeight: 900 }}>17h et 19h</span> pour un maximum de vues.
          </p>
        </motion.div>

        <motion.div variants={item} className="card-tech" style={{ padding: '40px' }}>
          <div className="icon-box blue" style={{ marginBottom: '25px' }}><MessageCircle size={28} /></div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>ACCUEIL MEMBRES</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)', lineHeight: '1.8' }}>
            Accueillir chaque nouveau membre en MP sur Discord dès qu'il rejoint le serveur.
          </p>
        </motion.div>

        <motion.div variants={item} className="card-tech" style={{ padding: '40px' }}>
          <div className="icon-box white" style={{ marginBottom: '25px' }}><BarChart3 size={28} /></div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>UNITÉS VISUELLES</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)', lineHeight: '1.8' }}>Production de médias immersifs haute-fidélité pour les campagnes.</p>
        </motion.div>
      </div>

    </motion.div>
  );
}
