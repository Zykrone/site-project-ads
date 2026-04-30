import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Copy, MessageSquare, Users, Video, CheckCircle2, AlertCircle, Clock, Mic, BookOpen, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CopyBlock = ({ title, icon, objective, text, accent = 'cyan' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const color = accent === 'red' ? '#ff2d55' : 'var(--tech-cyan)';
  return (
    <div className="card-tech mb-8" style={{ borderLeft: `4px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color }}>
          {icon || <MessageSquare size={18} />} {title}
        </h3>
        <button
          className="btn-tech"
          style={{ padding: '8px 20px', fontSize: '0.7rem', background: copied ? 'var(--success-green)' : undefined, color: copied ? '#000' : undefined }}
          onClick={handleCopy}
        >
          {copied ? '✓ COPIÉ !' : 'COPIER'}
        </button>
      </div>
      {objective && <p style={{ color: 'var(--text-soft)', marginBottom: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>🎯 {objective}</p>}
      <pre style={{
        background: 'rgba(0,0,0,0.35)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        fontSize: '0.88rem',
        color: '#fff',
        lineHeight: '1.7'
      }}>
        {text}
      </pre>
    </div>
  );
};

const StepCard = ({ step, icon, title, color = 'var(--tech-cyan)', children }) => (
  <motion.div
    className="card-tech mb-6"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    style={{ borderLeft: `4px solid ${color}`, position: 'relative', overflow: 'visible' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{
        width: '42px', height: '42px', borderRadius: '50%',
        background: `${color}22`, border: `2px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, fontWeight: 900, fontSize: '1.1rem', flexShrink: 0
      }}>
        {step}
      </div>
      <h3 style={{ color, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
        {icon} {title}
      </h3>
    </div>
    <div style={{ paddingLeft: '3.5rem' }}>{children}</div>
  </motion.div>
);

const InfoRow = ({ emoji, text }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--text-soft)' }}>
    <span>{emoji}</span><span>{text}</span>
  </div>
);

const Warn = ({ children }) => (
  <div style={{ marginTop: '1rem', padding: '12px 18px', background: 'rgba(255,45,85,0.08)', border: '1px solid rgba(255,45,85,0.25)', borderRadius: '12px', color: '#ff2d55', fontSize: '0.88rem', fontWeight: 700 }}>
    ⚠️ {children}
  </div>
);

// ─── TEMPLATES RÉSEAU ───
const msgTicketReseau = `👋 Bonjour,

Je t’invite à prendre connaissance des conditions de recrutement disponibles ici : RC ADS📍・conditions-recrutement-reseau….

Une fois celles-ci lues, merci de compléter ta candidature dans le salon suivant : RC ADS📋・exemple-candidature.

N’hésite pas à bien remplir toutes les informations demandées afin que ta demande puisse être traitée rapidement.`;

const msgDispoReseau = `Bonjour !

Merci d’avoir complété ta candidature. 🙏

Afin de planifier ton entretien vocal, pourrais-tu m’indiquer tes disponibilités (jours et créneaux horaires) ?

Dès que tu m’auras répondu, je noterai le rendez-vous et t’activerai l’accès au salon vocal.`;

const questionsReseau = `Candidat :
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

Question : Que ferais-tu si un de tes collègues gestions abuse de ses permissions devant tes yeux ?
Réponse :

Question : Comment réagirais-tu si un de tes Supérieurs hiérarchique te met un avertissement ou un rappel ?
Réponse :

Question : Possèdes-tu un ordinateur ?
reponse : 

Question: Es-ce que tu as de l'expérience en tant qu'influenceur ?
réponse : `;

// ─── TEMPLATE GRAB ───
const questionsGrab = `Candidat <@id> / id
> Réalisé par : <@ton_id>

**Question : Quelles qualités te semblent indispensables pour occuper le poste de grabeur ?**
Réponse : 
 
**Question : À quoi résumes-tu le rôle d’un Gestion Grab ?**
Reponse : 

**Questions de mise en situation**

**Question : Que ferais-tu si un de tes collègues gestions abuse de ses permissions devant tes yeux ?**
Réponse : 

**Question : Comment réagirais-tu si un de tes Hauts Gradés te met un avertissement ou un rappel ?**
Réponse : 

**Question : Possèdes-tu un ordinateur ?**
réponse : `;

// ─── INFOS SERVEUR RÉSEAU ───
const infoCommune = `📁 INFO COMMUNE
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📣・annonces
→ Salon des annonces officielles. À consulter régulièrement.

📜・règlement-gestion
→ Toutes les règles de fonctionnement. Lecture obligatoire.

📝・récap-réunion
→ Résumés des réunions. Decisions + points importants.

💬・chat
→ Discussion générale. Espace libre, respect obligatoire.

🚫・absences
→ Signaler les absences. Voir le message épinglé pour la procédure.`;

const infoReseau = `📁 INFO RÉSEAUX
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📣・annonce-réseaux
→ Annonces officielles réseau. À lire obligatoirement.

❓・comment-rank-up
→ Conditions de rank-up. Les vues sont le critère principal.

🧭・hiérarchie-réseaux
→ Hiérarchie des grades. Voir qui est supérieur à qui.

📊・résultats
→ Résultats (rank up / rank down). À consulter sam/dim.

✳️・travail-à-faire
→ Liste des tâches à effectuer.

💡・idées-tiktok
→ Proposer des idées de contenus TikTok.

📑・cr-réseaux / cr-réseaux senior
→ Comptes-rendus des actions importantes.

💬・chat-réseaux
→ Discussion générale entre membres staff réseaux.

📢・récaps-réunions réseaux
→ Résumés des réunions passées.

📍・réunion réseaux
→ Réunions officielles. Organisation + annonces en direct.`;

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

  return (
    <div className="view-container">
      <div className="text-center mb-12">
        <div className="badge mx-auto"><Users size={14} /> PÔLE RECRUTEMENT</div>
        <h1 className="mt-4">RECRUTEMENT <span className="title-grad">{selectedBranch.toUpperCase()}</span></h1>
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
              {/* GUIDE RECRUTEMENT RÉSEAU */}
              <section>
                <h2 className="mb-8 glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <BookOpen size={24} /> GUIDE COMPLET DE RECRUTEMENT
                </h2>

                {/* ÉTAPE 1 */}
                <StepCard step="1" icon={<MessageSquare size={16} />} title="PREMIER MESSAGE DANS LE TICKET">
                  <InfoRow emoji="🎯" text="Objectif : expliquer rapidement les étapes au candidat" />
                  <InfoRow emoji="・" text="Être clair et rapide" />
                  <InfoRow emoji="・" text="Expliquer les étapes simplement" />
                  <InfoRow emoji="・" text="Ne pas faire de long message" />
                  <InfoRow emoji="・" text="Attendre que le candidat remplisse avant de continuer" />
                </StepCard>
                <CopyBlock
                  title="MESSAGE D'ACCUEIL TICKET"
                  objective="Premier contact — expliquer les étapes au candidat"
                  text={msgTicketReseau}
                />

                {/* ÉTAPE 2 */}
                <StepCard step="2" icon={<Clock size={16} />} title="DEMANDE DES DISPONIBILITÉS" color="#ffb800">
                  <InfoRow emoji="🎯" text="Objectif : organiser l'entretien vocal" />
                  <InfoRow emoji="・" text="Demander quand le candidat est disponible" />
                  <InfoRow emoji="・" text="Une fois qu'il répond → noter dans le ticket (+entretien + son ID Discord)" />
                  <InfoRow emoji="・" text="Lui donner accès au vocal et se préparer à l'entretien" />
                  <Warn>Être rapide et organisé — ne pas oublier de noter son ID — vérifier l'accès vocal avant l'entretien</Warn>
                </StepCard>
                <CopyBlock
                  title="MESSAGE DISPONIBILITÉS"
                  objective="Demander les créneaux du candidat"
                  text={msgDispoReseau}
                  accent="cyan"
                />

                {/* ÉTAPE 3 */}
                <StepCard step="3" icon={<Mic size={16} />} title="PRÉPARER ET FAIRE PASSER L'ENTRETIEN" color="#7000ff">
                  <InfoRow emoji="🎯" text="Objectif : être prêt + évaluer le candidat correctement" />
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 700 }}>Avant l'entretien :</p>
                  <InfoRow emoji="・" text="Aller dans votre salon privé" />
                  <InfoRow emoji="・" text="Copier le modèle des questions ci-dessous" />
                  <InfoRow emoji="・" text="Remplir : Candidat <@id> / id — Réalisé par : toi" />
                </StepCard>

                {/* ÉTAPE 4 */}
                <StepCard step="4" icon={<CheckCircle2 size={16} />} title="PENDANT L'ENTRETIEN" color="var(--tech-cyan)">
                  <InfoRow emoji="👉" text="Saluer la personne (bonjour / bonsoir selon l'heure) et rester poli" />
                  <InfoRow emoji="👉" text="Mettre le candidat en confiance en lui parlant calmement" />
                  <InfoRow emoji="👉" text="Le rassurer : l'entretien n'est pas compliqué, pas de pression" />
                  <InfoRow emoji="👉" text="Lui dire qu'il a environ 90% de chances d'être accepté s'il connaît un minimum Discord et Shibuya" />
                  <InfoRow emoji="👉" text="Poser les questions une par une, laisser le candidat répondre tranquillement" />
                  <InfoRow emoji="👉" text="Noter ses réponses directement" />
                  <div style={{ marginTop: '1rem', padding: '14px 18px', background: 'rgba(0,210,255,0.06)', border: '1px solid rgba(0,210,255,0.2)', borderRadius: '12px' }}>
                    <p style={{ color: 'var(--tech-cyan)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>❓ QUESTIONS DISCORD OBLIGATOIRES :</p>
                    <InfoRow emoji="Q1" text={`Comment copier un ID Discord ? → Clic droit "Copier l'ID" / Appui long + 3 points`} />
                    <InfoRow emoji="Q2" text={`Que fais-tu si quelqu'un troll en vocal ? → Déconnecter / Mute → si ça continue : -tempmute`} />
                    <InfoRow emoji="Q3" text="Dois-je attendre un DM de mon chef pour regarder mes salons ? → NON, vérifier régulièrement" />
                  </div>
                </StepCard>

                {/* TEMPLATE QUESTIONS */}
                <CopyBlock
                  title="QUESTIONS RÉSEAU — TEMPLATE À COPIER"
                  objective="À remplir pendant l'entretien vocal"
                  text={questionsReseau}
                />

                {/* ÉTAPE 5 : APRÈS */}
                <StepCard step="5" icon={<AlertCircle size={16} />} title="APRÈS L'ENTRETIEN" color="#ff2d55">
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 700 }}>👀 Juger si le candidat est :</p>
                  <InfoRow emoji="・" text="Sérieux / Motivé / Respectueux / Clair dans ses réponses / Comprend le rôle" />
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', margin: '0.8rem 0', fontWeight: 700 }}>🏁 Décider :</p>
                  <InfoRow emoji="✅" text="Assez bon → Accepté" />
                  <InfoRow emoji="❌" text="Pas assez → Refusé" />
                  <Warn>Décider seul sauf si un autre recruteur ou supérieur est présent — dans ce cas décider à deux</Warn>
                  <div style={{ marginTop: '1rem', padding: '14px 18px', background: 'rgba(0,210,255,0.06)', border: '1px solid rgba(0,210,255,0.2)', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-soft)' }}>
                    👉 Après validation, le candidat devra rejoindre le serveur <strong style={{ color: '#fff' }}>Ads Shibuya</strong> pour finaliser son intégration et faire sa demande de rôles.
                  </div>
                </StepCard>

                {/* INFO SERVEUR */}
                <div style={{ marginTop: '2rem' }}>
                  <h2 className="mb-6 glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Info size={22} /> INFOS SERVEUR À TRANSMETTRE
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <CopyBlock title="📁 INFO COMMUNE" text={infoCommune} />
                    <CopyBlock title="📁 INFO RÉSEAUX" text={infoReseau} />
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="formation-grid">
              {/* SCRIPT GRAB - Redundant videos removed as requested */}
              <section>
                <h2 className="mb-6 glow-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <MessageSquare size={24} /> SCRIPTS D'ENTRETIEN GRAB
                </h2>
                <CopyBlock
                  title="QUESTIONS GRAB — TEMPLATE À COPIER"
                  objective="À remplir pendant l'entretien vocal"
                  text={questionsGrab}
                  accent="red"
                />
              </section>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
