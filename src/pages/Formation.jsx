import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Globe, TrendingUp, Zap, BookOpen, 
  Rocket, Share2, Play, AlertTriangle, Fingerprint,
  Ghost, MessageCircle, Layers,
  UserCheck, ShieldAlert, BarChart3, Camera,
  Target as TargetIcon, Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GrabSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '60px' }}>
      <div className="icon-box cyan" style={{ width: '100px', height: '100px' }}><Ghost size={45} /></div>
      <h2 className="glow-tech" style={{ fontSize: '3.5rem' }}>LE MANUEL DU GRABBEUR</h2>
    </div>

    <div className="card-tech mb-12" style={{ overflow: 'hidden', padding: '0' }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          src="https://www.youtube.com/embed/sOAt41TXb7g"
          title="Formation Nouveau Grab"
          allowFullScreen
        />
      </div>
    </div>
    
    <div className="tech-grid" style={{ gap: '50px' }}>
      <div className="card-tech" style={{ padding: '60px' }}>
        <div className="icon-box cyan" style={{ marginBottom: '40px' }}><Zap size={32} /></div>
        <h4 className="mb-8" style={{ fontSize: '2rem' }}>PHASE 1 : L'INFILTRATION</h4>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-soft)', lineHeight: '2' }}>
          Ne postez <span style={{ color: '#fff', fontWeight: 900 }}>jamais</span> de lien dès votre arrivée. C'est l'erreur fatale.
        </p>
        <ul style={{ marginTop: '30px', fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '2.2' }}>
          <li>• Discutez au moins 15 minutes de sujets variés.</li>
          <li>• Intégrez-vous comme un membre "commun".</li>
          <li>• Repérez les cibles qui semblent actives.</li>
        </ul>
      </div>

      <div className="card-tech" style={{ padding: '60px' }}>
        <div className="icon-box cyan" style={{ marginBottom: '40px' }}><TargetIcon size={32} /></div>
        <h4 className="mb-8" style={{ fontSize: '2rem' }}>PHASE 2 : MANIPULATION</h4>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-soft)', lineHeight: '2' }}>
          Utilisez la technique de la <span style={{ color: 'var(--tech-cyan)', fontWeight: 900 }}>comparaison indirecte</span>.
        </p>
        <ul style={{ marginTop: '30px', fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '2.2' }}>
          <li>• "Le staff est un peu tendu ici, je connais un coin plus tranquille."</li>
          <li>• Attendez la demande du lien : "C'est quoi ton serveur ?"</li>
          <li>• Restez naturel, ne forcez jamais le passage.</li>
        </ul>
      </div>
    </div>

    <div className="card-tech mt-12" style={{ padding: '60px', borderLeft: '10px solid var(--tech-cyan)', background: 'rgba(0, 210, 255, 0.02)' }}>
      <h4 className="mb-10 glow-tech" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Fingerprint size={40} /> L'ARMURE DU GRABBEUR
      </h4>
      <div className="tech-grid" style={{ gap: '60px' }}>
        <div className="card-tech" style={{ background: 'rgba(0,0,0,0.3)', padding: '40px' }}>
          <h5 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '20px' }}>SÉCURITÉ ANTI-BAN</h5>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-soft)', lineHeight: '1.9' }}>
            Si un staff adverse vous interroge, vous êtes juste un utilisateur qui aime parler. Ne mentionnez <span style={{ color: '#ff2d55', fontWeight: 900 }}>jamais</span> le mot "Grab" ou "ADS" sur un serveur étranger.
          </p>
        </div>
        <div className="card-tech" style={{ background: 'rgba(0,0,0,0.3)', padding: '40px' }}>
          <h5 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '20px' }}>CONVERSION DM</h5>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-soft)', lineHeight: '1.9' }}>
            Le DM doit être amical : "C'était sympa de parler avec toi, si tu veux repasser sur Shibuya voici mon lien perso". Pas de message groupé.
          </p>
        </div>
      </div>
    </div>
  </motion.section>
);

const ReseauSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '60px' }}>
      <div className="icon-box blue" style={{ width: '100px', height: '100px', background: 'rgba(58, 123, 213, 0.1)' }}><TrendingUp size={45} /></div>
      <h2 className="glow-tech" style={{ fontSize: '3.5rem' }}>STRATÉGIE VIRALE RÉSEAUX</h2>
    </div>

    <div className="card-tech mb-12" style={{ overflow: 'hidden', padding: '0' }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          src="https://www.youtube.com/embed/y-PEHsD1Bwk"
          title="Formation Réseau"
          allowFullScreen
        />
      </div>
    </div>

    <div className="card-tech mb-12" style={{ padding: '70px' }}>
      <div className="tech-grid mb-12" style={{ gap: '80px' }}>
        <div className="card-tech" style={{ background: 'rgba(255,255,255,0.02)', padding: '50px' }}>
          <h3 className="mb-10" style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '2.2rem' }}><Play size={35} className="glow-tech" /> L'ART DU "HOOK"</h3>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-soft)', lineHeight: '2', marginBottom: '30px' }}>
            Vous avez <span style={{ color: 'var(--tech-cyan)', fontWeight: 900 }}>2 secondes</span> pour empêcher le scroll. Voici les crochets gagnants :
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ padding: '25px', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: '#fff', fontWeight: 950, fontSize: '1.2rem' }}>L'AUTORITÉ :</p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '5px' }}>"Tout ce que vous savez sur Discord est FAUX."</p>
            </div>
            <div style={{ padding: '25px', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: '#fff', fontWeight: 950, fontSize: '1.2rem' }}>LE MYSTÈRE :</p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '5px' }}>"J'ai trouvé le serveur le plus secret de France..."</p>
            </div>
          </div>
        </div>

        <div className="card-tech" style={{ background: 'rgba(255,255,255,0.02)', padding: '50px' }}>
          <h3 className="mb-10" style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '2.2rem' }}><Share2 size={35} className="glow-tech" /> L'ENTONNOIR VIRAL</h3>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-soft)', lineHeight: '2', marginBottom: '30px' }}>
            Ne postez jamais l'invitation brute en description. <span style={{ color: '#ff2d55', fontWeight: 900 }}>Risque de shadowban.</span>
          </p>
          <div style={{ padding: '40px', border: '2px dashed var(--tech-cyan)', borderRadius: 'var(--radius-md)', background: 'rgba(0, 210, 255, 0.05)' }}>
            <p style={{ fontSize: '1.5rem', textAlign: 'center', color: '#fff', fontWeight: 950 }}>
              Vidéo &rarr; Profil &rarr; Lien Bio &rarr; Shibuya
            </p>
          </div>
        </div>
      </div>

      <div className="tech-grid" style={{ gap: '40px' }}>
        <div className="card-tech" style={{ padding: '50px', background: 'rgba(58, 123, 213, 0.05)', borderTop: '8px solid #3a7bd5' }}>
          <h4 className="mb-6" style={{ fontSize: '1.8rem' }}>ÉDITION CAPCUT</h4>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-soft)', lineHeight: '1.9' }}>
            Utilisez des filtres sombres et du texte blanc/cyan. Musique : Phonk ou Ambient sombre. Synchronisation image/son parfaite obligatoire.
          </p>
        </div>
        <div className="card-tech" style={{ padding: '50px', background: 'rgba(58, 123, 213, 0.05)', borderTop: '8px solid #3a7bd5' }}>
          <h4 className="mb-6" style={{ fontSize: '1.8rem' }}>ENGAGEMENT 10X</h4>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-soft)', lineHeight: '1.9' }}>
            Répondez à chaque commentaire avec une question. Ça double instantanément le nombre d'interactions et pousse la vidéo à l'infini.
          </p>
        </div>
      </div>
    </div>
  </motion.section>
);

export default function Formation() {
  const { currentUser, ROLES } = useAuth();
  const role = currentUser?.role;

  const isReseau = [
    ROLES.GESTION_RESEAU, ROLES.SENIOR_RESEAU, 
    ROLES.CHEF_RESEAU, ROLES.GERANT_RESEAU, 
    ROLES.UNIVERS
  ].includes(role);

  const isGrab = [
    ROLES.GESTION_GRAB, ROLES.SENIOR_GRAB, 
    ROLES.CHEF_GRAB, ROLES.GERANT_GRAB, 
    ROLES.UNIVERS
  ].includes(role);

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (isGrab && !isReseau) setActiveTab('grab');
    else if (isReseau && !isGrab) setActiveTab('reseau');
    else if (isGrab && isReseau) setActiveTab('grab');
  }, [isGrab, isReseau]);

  if (!activeTab) return null;

  return (
    <div className="view-container" style={{ padding: '40px 0 150px' }}>
      <div className="text-center mb-16">
        <div className="badge mx-auto" style={{ padding: '12px 30px', fontSize: '1rem' }}><Layers size={18} /> MANUELS OPÉRATIONNELS</div>
        <h1 style={{ fontSize: '6rem', marginBottom: '30px' }}>UNITÉS <span className="title-grad">SÉPARÉES</span></h1>
        
        {(isGrab && isReseau) && (
          <div className="secondary-nav" style={{ marginTop: '40px', justifyContent: 'center' }}>
            <button 
              className={`secondary-link ${activeTab === 'grab' ? 'active' : ''}`}
              onClick={() => setActiveTab('grab')}
              style={{ padding: '15px 40px', fontSize: '1.1rem' }}
            >
              CÔTÉ GRAB
            </button>
            <button 
              className={`secondary-link ${activeTab === 'reseau' ? 'active' : ''}`}
              onClick={() => setActiveTab('reseau')}
              style={{ padding: '15px 40px', fontSize: '1.1rem' }}
            >
              CÔTÉ RÉSEAU
            </button>
          </div>
        )}
      </div>

      <div className="formation-grid">
        <AnimatePresence mode="wait">
          {activeTab === 'grab' && <GrabSection key="grab" />}
          {activeTab === 'reseau' && <ReseauSection key="reseau" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
