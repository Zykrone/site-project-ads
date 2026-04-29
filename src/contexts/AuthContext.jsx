import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    const savedUsers = localStorage.getItem('users_v6');
    const savedRequests = localStorage.getItem('pendingRequests_v6');
    
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
      
      const session = localStorage.getItem('session_v6');
      if (session) {
        const user = parsedUsers.find(u => u.id === session);
        if (user) setCurrentUser(user);
      }
    } else {
      // Initial Setup
      const initialUsers = [
        { id: '1', name: 'Univers', discordId: '0001', role: ROLES.UNIVERS, password: 'root' }
      ];
      setUsers(initialUsers);
      localStorage.setItem('users_v6', JSON.stringify(initialUsers));
    }

    if (savedRequests) {
      setPendingRequests(JSON.parse(savedRequests));
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) localStorage.setItem('users_v6', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('pendingRequests_v6', JSON.stringify(pendingRequests));
  }, [pendingRequests]);

  const login = (name, password) => {
    const user = users.find(u => (u.name === name || u.discordId === name) && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('session_v6', user.id);
      return true;
    }
    return false;
  };

  const changePassword = (newPassword) => {
    if (!currentUser) return false;
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, password: newPassword } : u));
    setCurrentUser(prev => ({ ...prev, password: newPassword }));
    return true;
  };

  const registerRequest = (discordId, password, pseudo, type) => {
    const newRequest = { id: Date.now().toString(), discordId, password, pseudo, type, status: 'pending' };
    setPendingRequests(prev => [...prev || [] , newRequest]);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('session_v6');
  };

  const acceptRequest = (requestId, role) => {
    const req = pendingRequests.find(r => r.id === requestId);
    if (!req) return;

    const newUser = {
      id: req.id,
      name: req.pseudo || `Agent_${req.discordId.slice(-4)}`,
      discordId: req.discordId,
      role: role,
      password: req.password // Use the password they registered with
    };

    setUsers(prev => [...prev, newUser]);
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const rejectRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const changeUserRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
  };

  const kickUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (currentUser && currentUser.id === userId) {
      logout();
    }
  };

  const resetUserPassword = (userId) => {
    const newPassword = Math.random().toString(36).slice(-8).toUpperCase();
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, password: newPassword } : u));
    return newPassword;
  };

  const setMyRole = (role) => {
    if (currentUser?.name === 'Univers') {
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
    
    // Un gérant/chef ne peut assigner que des rôles de SA propre branche (ou inférieur)
    return myBranch === targetBranch;
  };

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
