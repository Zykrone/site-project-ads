import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, MessageSquare, Users, AlertCircle, Clock, Mic, BookOpen, Info, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// ─── COMPOSANTS UTILITAIRES ───

const CopyBlock = ({ title, icon, objective, text, accent = 'cyan' }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const color = accent === 'red' ? '#ff2d55' : 'var(--tech-cyan)';
  
  return (
    <div className="card-tech mb-8" style={{ borderLeft: `4px solid ${color}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color, margin: 0, fontSize: '1.1rem' }}>
          {icon || <MessageSquare size={20} />} {title}
        </h3>
        <button
          className="btn-tech"
          style={{ 
            padding: '8px 20px', 
            fontSize: '0.75rem', 
            background: copied ? 'var(--success-green)' : 'rgba(255,255,255,0.05)', 
            color: copied ? '#000' : '#fff',
            border: copied ? 'none' : '1px solid rgba(255,255,255,0.1)'
          }}
          onClick={handleCopy}
        >
          {copied ? '✓ COPIÉ !' : 'COPIER'}
        </button>
      </div>
      
      {objective && (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1.5rem', padding: '10px 15px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
          <span style={{ fontSize: '1.2rem' }}>🎯</span>
          <p style={{ color: 'var(--text-soft)', margin: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>{objective}</p>
        </div>
      )}
      
      <pre style={{
        background: '#000',
        padding: '25px',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        color: '#ccc',
        lineHeight: '1.8',
        margin: 0
      }}>
        {text}
      </pre>
    </div>
  );
};

const StepCard = ({ step, icon, title, color = 'var(--tech-cyan)', children }) => (
  <motion.div
    className="card-tech mb-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    style={{ borderLeft: `4px solid ${color}`, padding: '30px' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
      <div style={{ 
        width: '32px', height: '32px', 
        borderRadius: '50%', background: color, 
        color: '#000', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', 
        fontWeight: 900, fontSize: '0.9rem' 
      }}>
        {step}
      </div>
      <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {icon} {title}
      </h3>
    </div>
    <div style={{ paddingLeft: '47px' }}>
      {children}
    </div>
  </motion.div>
);

const InfoRow = ({ emoji, text }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-soft)' }}>
    <span style={{ opacity: 0.8 }}>{emoji}</span>
    <span style={{ lineHeight: 1.5 }}>{text}</span>
  </div>
);

const Warn = ({ children }) => (
  <div style={{ 
    marginTop: '20px', 
    padding: '15px 20px', 
    background: 'rgba(255,45,85,0.05)', 
    border: '1px solid rgba(255,45,85,0.2)', 
    borderRadius: '12px', 
    color: '#ff2d55', 
    fontSize: '0.85rem', 
    fontWeight: 600,
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  }}>
    <AlertCircle size={18} />
    <span>{children}</span>
  </div>
);

// ─── TEMPLATES & CONTENU ───

const TEMPLATES = {
  reseau: {
    ticket: `👋 Bonjour,

Je t’invite à prendre connaissance des conditions de recrutement disponibles ici : <#1482432358295670865>

Une fois celles-ci lues, merci de compléter ta candidature dans le salon suivant : <#1440643396049043528>

N’hésite pas à bien remplir toutes les informations demandées afin que ta demande puisse être traitée rapidement.`,
    
    dispo: `Bonjour !

Merci d’avoir complété ta candidature. 🙏

Afin de planifier ton entretien vocal, pourrais-tu m’indiquer tes disponibilités (jours et créneaux horaires) ?

Dès que tu m’auras répondu, je noterai le rendez-vous et t’activerai l’accès au salon vocal.`,
    
    questions: `Candidat :
<@id> / id
Réalisé par : 

Questions Globale

Question : Quelles qualités te semblent indispensables pour occuper le poste de gestion réseau  ?
Réponse :

Question : À quoi résumes-tu le rôle d’un Gestion réseaux ?
Réponse : 

Question: pourquoi toi et pas un autre candidat
réponse : 

Question : As tu des problèmes avec des haut  gradé du serveur ? 
Réponse : 

Questions de mise en situation 

Question : comment réagis-tu face à un utilisateur agressif ou irrespectueux dans les salons publics ?
Réponse : 

Question : Un utilisateur se plaint d’avoir été banni injustement, que fais-tu ?
Réponse : 

Question : si un membre de l'équipe de modération ne respecte pas les règles que fait tu ?
Réponse :`,
    
    recap: `Compte-rendu d’entretien - Réseau

Candidat : <@id>
Discord ID : 
Date : 

Avis global : 
Points forts : 
Points faibles : 

Décision finale : ✅ ADMIS / ❌ REFUSÉ / ⏳ EN ATTENTE`
  },
  
  grab: {
    ticket: `👋 Bonjour

Merci de l'intérêt porté à la branche GRAB. Voici la marche à suivre :

1. Prends connaissance des conditions de recrutement grab : <#1471539110303760506>
2. Remplis le formulaire de candidature disponible dans ce salon : <#1440643396049043528>

Une fois rempli, nous examinerons ta demande.`,
    
    dispo: `Hello, ton dossier a retenu notre attention. 🎯

Indique-nous tes prochaines disponibilités pour un court entretien de validation.`,
    
    questions: `Candidat : <@id>
Branche : GRAB

Question : Pourquoi souhaites-tu rejoindre la section GRAB ?
Réponse :

Question : Quelle est ton expérience dans l'acquisition de membres ?
Réponse :`,
    
    recap: `CR Entretien GRAB
Candidat : <@id>
Status : ✅ ADMIS / ❌ REFUSÉ`
  },

  salons: `💬 SALONS RÉSEAUX 💬

📍・conditions-recrutement-reseau
→ Règlement & Prérequis.

📋・exemple-candidature
→ Template officiel à suivre.

📑・cr-réseaux / cr-réseaux senior
→ Comptes-rendus des actions importantes.

💬・chat-réseaux
→ Discussion générale entre membres staff réseaux.

📢・récaps-réunions réseaux
→ Résumés des réunions passées.

📍・réunion réseaux
→ Réunions officielles. Organisation + annonces en direct.`
};

// ─── COMPOSANT PRINCIPAL ───

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

  const templates = selectedBranch === 'reseau' ? TEMPLATES.reseau : TEMPLATES.grab;

  return (
    <div className="view-container">
      <div className="text-center mb-12">
        <div className="badge mx-auto"><Users size={14} /> PÔLE RECRUTEMENT</div>
        <h1 className="mt-4">RECRUTEMENT <span className="title-grad">{selectedBranch.toUpperCase()}</span></h1>
        
        {isGlobalManager && (
          <div className="secondary-nav" style={{ marginTop: '30px' }}>
            <button 
              className={`secondary-link ${selectedBranch === 'reseau' ? 'active' : ''}`} 
              onClick={() => setSelectedBranch('reseau')}
            >
              BRANCHE RÉSEAU
            </button>
            <button 
              className={`secondary-link ${selectedBranch === 'grab' ? 'active' : ''}`} 
              onClick={() => setSelectedBranch('grab')}
            >
              BRANCHE GRAB
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBranch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="formation-grid">
            {/* GUIDE ET ÉTAPES */}
            <section>
              <h2 className="mb-8 glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <BookOpen size={24} /> GUIDE COMPLET DE RECRUTEMENT
              </h2>

              <StepCard step="1" icon={<MessageSquare size={18} />} title="PREMIER MESSAGE DANS LE TICKET">
                <InfoRow emoji="🎯" text="Objectif : expliquer rapidement les étapes au candidat" />
                <InfoRow emoji="・" text="Être clair et rapide" />
                <InfoRow emoji="・" text="Expliquer les étapes simplement" />
                <InfoRow emoji="・" text="Ne pas faire de long message" />
                <InfoRow emoji="・" text="Attendre que le candidat remplisse avant de continuer" />
              </StepCard>
              
              <CopyBlock
                title="MESSAGE D'ACCUEIL TICKET"
                objective="Premier contact — expliquer les étapes au candidat"
                text={templates.ticket}
              />

              <StepCard step="2" icon={<Clock size={18} />} title="DEMANDE DES DISPONIBILITÉS" color="#ffb800">
                <InfoRow emoji="🎯" text="Objectif : organiser l'entretien vocal" />
                <InfoRow emoji="・" text="Demander quand le candidat est disponible" />
                <InfoRow emoji="・" text="Une fois qu'il répond → noter dans le ticket (+entretien + son ID Discord)" />
                <InfoRow emoji="・" text="Lui donner accès au vocal et se préparer à l'entretien" />
                <Warn>Être rapide et organisé — ne pas oublier de noter son ID — vérifier l'accès vocal avant l'entretien</Warn>
              </StepCard>
              
              <CopyBlock
                title="MESSAGE DISPONIBILITÉS"
                objective="Demander les créneaux du candidat"
                text={templates.dispo}
              />

              <StepCard step="3" icon={<Mic size={18} />} title="PRÉPARER ET FAIRE PASSER L'ENTRETIEN" color="#7000ff">
                <InfoRow emoji="🎯" text="Objectif : être prêt + évaluer le candidat correctement" />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Avant l'entretien :</p>
                <InfoRow emoji="・" text="Aller dans votre salon privé" />
                <InfoRow emoji="・" text="Vérifier l'âge et la maturité" />
                <InfoRow emoji="・" text="Lancer l'enregistrement ou prendre des notes" />
              </StepCard>
            </section>

            {/* OUTILS ET TEMPLATES */}
            <section>
              <h2 className="mb-8 glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Zap size={24} /> OUTILS ET TEMPLATES
              </h2>

              <CopyBlock
                title="LISTE DES QUESTIONS"
                objective="Guide d'entretien pour une évaluation standardisée."
                text={templates.questions}
                accent="cyan"
              />

              <CopyBlock
                title="MODÈLE DE COMPTE-RENDU"
                objective="À poster dans les logs après chaque entretien."
                text={templates.recap}
                accent="red"
              />

              {selectedBranch === 'reseau' && (
                <div className="card-tech" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                  <h3 style={{ color: 'var(--tech-cyan)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Info size={18} /> ARCHITECTURE SALONS
                  </h3>
                  <pre style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.85rem', 
                    lineHeight: 1.8, 
                    color: 'rgba(255,255,255,0.6)',
                    margin: 0,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {TEMPLATES.salons}
                  </pre>
                </div>
              )}
            </section>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
