<div align="center">
  <img src="public/favicon.svg" alt="Logo ADS" width="120" />
  <h1>🚀 Gestion ADS Platform</h1>
  <p><strong>Plateforme futuriste et immersive pour la gestion de recrutement et d'opérations</strong></p>
</div>

---

## 📖 À propos du projet

La plateforme **Gestion ADS** est une application web innovante conçue pour structurer et fluidifier les opérations internes (Réseau et GRAB). Dotée d'une interface néon futuriste et d'un système de navigation avancé, cette plateforme garantit une séparation claire des privilèges selon la hiérarchie du personnel (Normal, Senior, Chef/Gérant). 

Le projet met l'accent sur la **sécurité des accès**, l'**apprentissage par modules vidéo** et une **gestion fluide des candidatures**.

## ✨ Fonctionnalités Principales

- 🔐 **Système d'Accès Hiérarchique :** Portails distincts basés sur le grade (Normal, Senior, Gérant/Chef).
- 🌌 **UI/UX Futuriste :** Design cyberpunk/neon avec animations fluides utilisant `framer-motion`.
- 📁 **Gestion "Réseau" & "GRAB" :** Deux environnements de travail séparés pour structurer les opérations.
- 🎓 **Hub de Formation Intégré :** Guides textuels et modules vidéo intégrés (ex: Tutoriels de recrutement et formations de terrain).
- 🛠️ **Panel d'Administration (Dashboard) :** Outils permettant aux gérants d'accepter ou rejeter des candidatures et de gérer les utilisateurs avec un système de réinitialisation de mots de passe.
- 🔗 **Authentification Sécurisée :** Connexion et inscription requérant un ID Discord et des mots de passe.

## 💻 Stack Technique

Le projet a été développé en utilisant des technologies modernes pour assurer rapidité et maintenabilité :

- **Framework :** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routage :** `react-router-dom`
- **Animations :** `framer-motion`
- **Icônes :** `lucide-react`
- **Stylisation :** Vanilla CSS optimisé

## 🚀 Installation & Démarrage (Local)

Pour lancer le projet sur votre machine en environnement de développement :

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/Zykrone/site-project-ads.git
   cd site-project-ads
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   *(Le site sera accessible via l'adresse locale fournie par Vite, généralement http://localhost:5173)*

## 📂 Structure du projet (Aperçu)

```text
📦 site-project-ads
 ┣ 📂 public           # Assets publics (favicon, images)
 ┣ 📂 src
 ┃ ┣ 📂 assets         # Ressources locales du projet
 ┃ ┣ 📂 contexts       # Contextes React (ex: AuthContext pour la session)
 ┃ ┣ 📂 pages          # Pages principales (Dashboard, Panel, Recrutement, Landing, etc.)
 ┃ ┣ 📜 App.jsx        # Point d'entrée des routes
 ┃ ┣ 📜 index.css      # Variables globales et design system (neon, couleurs)
 ┃ ┗ 📜 main.jsx       # Initialisation React
 ┣ 📜 package.json     # Dépendances du projet
 ┗ 📜 vite.config.js   # Configuration de Vite
```

## 🔒 Sécurité
Ce projet intègre un système d'identification par **mot de passe** et un registre lié au **Discord ID** des membres de l'organisation. Un panel spécial permet aux managers de générer des codes d'accès temporaires pour les utilisateurs ayant besoin de réinitialiser leurs accès.

---
<div align="center">
  <i>Développé avec passion pour l'organisation ADS 🌟</i>
</div>
