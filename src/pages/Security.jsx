import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, AlertCircle, Key, RefreshCw } from 'lucide-react';

export default function Security() {
  const { changePassword } = useAuth();
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwords.new !== passwords.confirm) {
      return setError('Les nouveaux mots de passe ne correspondent pas.');
    }

    if (passwords.new.length < 4) {
      return setError('Le mot de passe doit contenir au moins 4 caractères.');
    }

    setLoading(true);
    // Dans notre système simulé, on ne vérifie pas l'ancien pour simplifier, 
    // mais on pourrait si on stockait l'actuel dans le state.
    const ok = changePassword(passwords.new);
    
    setTimeout(() => {
      if (ok) {
        setSuccess('Clé d\'accès mise à jour avec succès.');
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
        setError('Erreur lors de la mise à jour.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="view-container">
      <div className="text-center mb-12">
        <div className="badge mx-auto"><Lock size={14} /> PROTOCOLES DE SÉCURITÉ</div>
        <h1 className="mt-4">MODIFIER MA CLÉ D'ACCÈS</h1>
      </div>

      <div className="card-tech mx-auto" style={{ maxWidth: '500px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
           <div className="logo-icon mx-auto" style={{ width: '60px', height: '60px', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--tech-cyan)' }}>
             <Key size={30} />
           </div>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="tech-alert error mb-6">
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="tech-alert success mb-6">
            <ShieldCheck size={18} /> {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="tech-form">
          <div className="tech-group mb-6">
            <label>NOUVELLE CLÉ D'ACCÈS</label>
            <input 
              type="password" 
              className="tech-input" 
              placeholder="••••••••"
              value={passwords.new}
              onChange={e => setPasswords({...passwords, new: e.target.value})}
              required
            />
          </div>

          <div className="tech-group mb-8">
            <label>CONFIRMER LA CLÉ</label>
            <input 
              type="password" 
              className="tech-input" 
              placeholder="••••••••"
              value={passwords.confirm}
              onChange={e => setPasswords({...passwords, confirm: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn-tech w-full" style={{ padding: '15px' }} disabled={loading}>
            {loading ? <RefreshCw className="spin" size={18} /> : 'METTRE À JOUR LA CLÉ'}
          </button>
        </form>

        <p style={{ marginTop: '30px', color: 'var(--text-soft)', fontSize: '0.8rem', textAlign: 'center' }}>
          La mise à jour de votre clé sera effective immédiatement sur votre session actuelle et pour vos prochaines connexions.
        </p>
      </div>
    </div>
  );
}
