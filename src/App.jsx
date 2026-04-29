import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Panel from './pages/Panel';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="cyber-grid-bg"></div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/panel/*" element={<Panel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
