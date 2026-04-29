import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const ROLES = {
  UNIVERS: 'Univers',
  GERANT_RESEAU: 'Gérant Réseau',
  GERANT_GRAB: 'Gérant Grab',
  CHEF_RESEAU: 'Chef Réseau',
  CHEF_GRAB: 'Chef Grab',
  SENIOR_RESEAU: 'Gestion Senior Réseau',
  SENIOR_GRAB: 'Gestion Senior Grab',
  GESTION_RESEAU: 'Gestion Réseau',
  GESTION_GRAB: 'Gestion Grab'
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local session
    const session = localStorage.getItem('session_v6');

    // Timeout de secours : si Firebase ne répond pas en 8s, on débloque quand même l'interface
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 8000);
    
    // Subscribe to users collection (Real-time updates)
    const unsubscribeUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        clearTimeout(timeout);
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Setup initial Univers user if database is completely empty
        if (usersData.length === 0) {
          const initialUser = { name: 'Univers', discordId: '0001', role: ROLES.UNIVERS, password: 'root' };
          setDoc(doc(db, 'users', 'univers_root'), initialUser);
          usersData.push({ id: 'univers_root', ...initialUser });
        }
        
        setUsers(usersData);
        
        // Auto re-login if session exists
        if (session) {
          const user = usersData.find(u => u.id === session);
          if (user) {
            setCurrentUser(user);
          } else {
            localStorage.removeItem('session_v6');
            setCurrentUser(null);
          }
        }
        
        setLoading(false);
      },
      (error) => {
        // En cas d'erreur Firebase (réseau, règles, etc.), on débloque quand même
        console.error('Firebase users error:', error);
        clearTimeout(timeout);
        setLoading(false);
      }
    );

    // Subscribe to pending requests (Real-time updates)
    const unsubscribeRequests = onSnapshot(
      collection(db, 'requests'),
      (snapshot) => {
        const reqData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPendingRequests(reqData);
      },
      (error) => {
        console.error('Firebase requests error:', error);
      }
    );

    return () => {
      clearTimeout(timeout);
      unsubscribeUsers();
      unsubscribeRequests();
    };
  }, []);

  const login = (name, password) => {
    const user = users.find(u => (u.name === name || u.discordId === name) && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('session_v6', user.id);
      return true;
    }
    return false;
  };

  const changePassword = async (newPassword) => {
    if (!currentUser) return false;
    await updateDoc(doc(db, 'users', currentUser.id), { password: newPassword });
    setCurrentUser(prev => ({ ...prev, password: newPassword }));
    return true;
  };

  const registerRequest = async (discordId, password, pseudo, type) => {
    const newRequest = { discordId, password, pseudo, type, status: 'pending', createdAt: Date.now() };
    await addDoc(collection(db, 'requests'), newRequest);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('session_v6');
  };

  const acceptRequest = async (requestId, role) => {
    const req = pendingRequests.find(r => r.id === requestId);
    if (!req) return;

    const newUser = {
      name: req.pseudo || `Agent_${req.discordId.slice(-4)}`,
      discordId: req.discordId,
      role: role,
      password: req.password
    };

    // Add to real users DB
    await addDoc(collection(db, 'users'), newUser);
    // Delete from pending requests DB
    await deleteDoc(doc(db, 'requests', requestId));
  };

  const rejectRequest = async (requestId) => {
    await deleteDoc(doc(db, 'requests', requestId));
  };

  const changeUserRole = async (userId, newRole) => {
    await updateDoc(doc(db, 'users', userId), { role: newRole });
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
  };

  const kickUser = async (userId) => {
    await deleteDoc(doc(db, 'users', userId));
    if (currentUser && currentUser.id === userId) {
      logout();
    }
  };

  const resetUserPassword = async (userId) => {
    const newPassword = Math.random().toString(36).slice(-8).toUpperCase();
    await updateDoc(doc(db, 'users', userId), { password: newPassword });
    return newPassword;
  };

  const setMyRole = async (role) => {
    if (currentUser?.name === 'Univers') {
      await updateDoc(doc(db, 'users', currentUser.id), { role });
      setCurrentUser(prev => ({ ...prev, role }));
    }
  };

  // Helper pour vérifier la gestion
  const getBranch = (role) => {
    if (!role) return 'NONE';
    if (role === ROLES.UNIVERS) return 'ALL';
    if (role.includes('Réseau')) return 'RESEAU';
    if (role.includes('Grab')) return 'GRAB';
    return 'NONE';
  };

  const canManageRoles = () => {
    const role = currentUser?.role;
    if (!role) return false;
    return [ROLES.UNIVERS, ROLES.GERANT_RESEAU, ROLES.GERANT_GRAB, ROLES.CHEF_RESEAU, ROLES.CHEF_GRAB].includes(role);
  };

  const canAssignRole = (targetRole) => {
    if (currentUser?.role === ROLES.UNIVERS) return true;
    const myBranch = getBranch(currentUser?.role);
    const targetBranch = getBranch(targetRole);
    
    // Un gérant/chef ne peut assigner que des rôles de SA propre branche
    return myBranch === targetBranch;
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a', color: '#00f0ff', fontFamily: 'monospace', fontSize: '1.2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid rgba(0, 240, 255, 0.1)', borderTopColor: '#00f0ff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <span>CONNEXION AU RÉSEAU SÉCURISÉ...</span>
        </div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      currentUser, users, pendingRequests, 
      login, registerRequest, logout, acceptRequest, rejectRequest, 
      changeUserRole, kickUser, canManageRoles, canAssignRole, setMyRole,
      changePassword, resetUserPassword,
      ROLES, getBranch
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
