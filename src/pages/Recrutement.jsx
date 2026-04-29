import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Copy, Terminal, MessageSquare, 
  HelpCircle, Users, BookOpen, Mic, 
  CheckCircle2, AlertCircle, Clock, ClipboardCheck, Video, Info
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CopyBlock = ({ title, objective, text }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-tech mb-8">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={20} /> {title}
        </h3>
        <button 
          className="btn-tech" 
          style={{ padding: '8px 16px', fontSize: '0.7rem' }} 
          onClick={handleCopy}
        >
          {copied ? 'COPIÉ !' : 'COPIER'}
        </button>
      </div>
      <p style={{ color: 'var(--text-soft)', marginBottom: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
        Objectif : {objective}
      </p>
      <pre style={{ 
        background: 'rgba(0,0,0,0.3)', 
        padding: '20px', 
        borderRadius: '12px', 
        border: '1px solid var(--glass-border)',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        color: '#fff'
      }}>
        {text}
      </pre>
    </div>
  );
};

export default function Recrutement() {
  const { currentUser, ROLES, getBranch } = useAuth();
  const role = currentUser?.role;
  const isSeniorPlus = [
    ROLES.UNIVERS, 
    ROLES.GERANT_RESEAU, ROLES.GERANT_GRAB, 
    ROLES.CHEF_RESEAU, ROLES.CHEF_GRAB, 
    ROLES.SENIOR_RESEAU, ROLES.SENIOR_GRAB
  ].includes(role);

  const isGlobalManager = [ROLES.UNIVERS].includes(role);
  const userBranch = getBranch(role);
  const [selectedBranch, setSelectedBranch] = useState(userBranch === 'GRAB' ? 'grab' : 'reseau');

  if (!isSeniorPlus) {
    return (
      <div className="denied-view" style={{ textAlign: 'center', padding: '100px 0' }}>
        <ShieldAlert size={80} className="glow-tech mx-auto mb-8" />
        <h2 style={{ fontSize: '3rem' }}>ACCÈS_REFUSÉ</h2>
        <p style={{ color: 'var(--text-soft)', fontSize: '1.2rem', marginTop: '20px' }}>
          Unité de niveau <span style={{ color: 'var(--tech-cyan)', fontWeight: 800 }}>Senior</span> requise.
        </p>
      </div>
    );
  }

  const firstMessageReseau = `👋 Bonjour [NOM],
  
Je t’invite à prendre connaissance des conditions de recrutement disponibles ici : <#1482432358295670865>.
C'est la base pour rejoindre l'unité de visibilité.

Une fois lues, complète ta candidature ici : <#1440643396049043528>.`;

  const entretienReseau = `Candidat : <@ID> / \`ID\`
Réalisé par : [TON_NOM]

▽ Questions Globales ▽

Question : Quelles qualités te semblent indispensables pour occuper le poste de gestion réseau ?
> Réponse :

Question : À quoi résumes-tu le rôle d’un Gestion réseaux ?
> Réponse :

Question : Pourquoi toi et pas un autre candidat ?
> Réponse :

Question : As-tu des problèmes avec des hauts gradés du serveur ?
> Réponse :

▽ Questions de mise en situation ▽

Question : Que ferais-tu si un de tes collègues gestions abuse de ses permissions devant tes yeux ?
> Réponse :

Question : Comment réagirais-tu si un de tes Supérieurs hiérarchiques te met un avertissement ou un rappel ?
> Réponse :

Questions complémentaires

Question : Possèdes-tu un ordinateur ?
> Réponse :

Question : Est-ce que tu as de l'expérience en tant qu'influenceur ?
> Réponse :`;

  const firstMessageGrab = `👋 Bonjour [NOM],

Bienvenue dans le processus de recrutement pour l'unité d'extraction (Grab).
Conditions à lire ici : <#1482432358295670865>.

Complète ensuite ton dossier ici : <#1440643396049043528>.`;

  const entretienGrab = `Candidat : <@ID> / \`ID\`
Date : [ 27/04/2026 ]
Réalisé par : [TON_NOM]

▽ Questions Globales ▽

Question : Peux-tu te présenter rapidement ? (Âge, expérience sur Discord, rôles occupés précédemment, motivations...)
> Réponse :

Question : Pourrais-tu me donner 3 qualités et 3 défauts ?
> - Qualités : 
> - Défauts : 

Question : Depuis combien de temps es-tu sur le serveur et membre du staff sur Shibuya ?
> Sur Shibuya depuis : 
> Staff depuis : 

Question : Quelles qualités te semblent indispensables pour occuper le poste de grabeur ?
> Réponse : 

Question : Quelles compétences penses-tu devoir encore développer pour être pleinement efficace dans le rôle de grabeur ?
> Réponse : 

Question : Pourquoi toi et pas un autre candidat ?
> Réponse : 

Question : À quoi résumes-tu le rôle d’un Gestion Grab ?
> Réponse : 

▽ Questions de mise en situation ▽

Question : Que ferais-tu si un de tes collègues gestions abuse de ses permissions devant tes yeux ?
> Réponse : 

Question : Comment réagirais-tu si un de tes Hauts Gradés de met un avertissement ou un rappel ?
> Réponse :

Questions complémentaires

Question : As-tu des conflits actuels avec des membres du haut staff ou les owners ?
> Réponse : 

Question : Es-tu quelqu’un qui s’énerve facilement ? Si oui, dans quelles situations ?
> Réponse : 

Question : Possèdes-tu un ordinateur ?
> Réponse : 

Question : Est-ce que tu as de l'expérience en tant que grabbeur ?
> Réponse : 

Question : Est-ce que tu es sur beaucoup de serveurs concurrents ?
> Réponse :`;

  return (
    <div className="view-container">
      <div className="text-center mb-12">
        <div className="badge mx-auto"><Users size={14} /> PÔLE RECRUTEMENT</div>
        <h1 className="mt-4">RECRUTEMENT {selectedBranch.toUpperCase()}</h1>
        {isGlobalManager && (
          <div className="secondary-nav" style={{ marginTop: '20px' }}>
             <button className={`secondary-link ${selectedBranch === 'reseau' ? 'active' : ''}`} onClick={() => setSelectedBranch('reseau')}>BRANCHE RÉSEAU</button>
             <button className={`secondary-link ${selectedBranch === 'grab' ? 'active' : ''}`} onClick={() => setSelectedBranch('grab')}>BRANCHE GRAB</button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBranch}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {selectedBranch === 'reseau' ? (
            <div className="formation-grid">
              <section>
                <h2 className="mb-6 glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Video size={24} /> FORMATION RÉSEAU : LA VIDÉO
                </h2>
                <div className="card-tech" style={{ overflow: 'hidden', padding: '0' }}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      src="https://www.youtube.com/embed/y-PEHsD1Bwk"
                      title="Formation Réseau"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="mt-4 p-6 card-tech">
                  <p style={{ color: 'var(--text-soft)' }}>
                    Vidéo obligatoire pour les nouvelles unités Réseau. Maîtrisez ces bases pour valider leurs entretiens.
                  </p>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="mb-6 glow-tech">SCRIPTS D'ENTRETIEN</h2>
                <CopyBlock title="TICKET RÉSEAU" objective="Premier contact réseau." text={firstMessageReseau} />
                <CopyBlock title="QUESTIONS RÉSEAU" objective="À remplir en vocal." text={entretienReseau} />
              </section>
            </div>
          ) : (
            <div className="formation-grid">
              <section>
                <h2 className="mb-6 glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Video size={24} /> FORMATION GRAB : LA VIDÉO
                </h2>
                <div className="card-tech" style={{ overflow: 'hidden', padding: '0' }}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      src="https://www.youtube.com/embed/sOAt41TXb7g"
                      title="Formation Nouveau Grab"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="mt-4 p-6 card-tech">
                  <p style={{ color: 'var(--text-soft)' }}>
                    Vidéo obligatoire pour les nouvelles unités Grab. Maîtrisez ces bases pour valider leurs entretiens.
                  </p>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="mb-6 glow-tech">SCRIPTS D'ENTRETIEN GRAB</h2>
                <CopyBlock title="TICKET GRAB" objective="Premier contact grab." text={firstMessageGrab} />
                <CopyBlock title="QUESTIONS GRAB" objective="À remplir en vocal." text={entretienGrab} />
              </section>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
