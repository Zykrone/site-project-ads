import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrollLanding.css';

export default function TrollLanding() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [showError, setShowError] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.error("CRITICAL ERROR: TROP DE BUG DANS LE SYSTEME");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleGrab = (e) => {
    e.preventDefault();
    setClickCount(c => c + 1);
    if (clickCount > 2) {
      alert("BON OK TU AS GAGNÉ. GO GRAB !");
      navigate('/panel/grab');
    } else {
      alert("HAHA TU M'AS RATÉ !");
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }
  };

  const handleReseau = () => {
    alert("ERREUR 404: LE RÉSEAU EST EN PLS. VEUILLEZ REDÉMARRER VOTRE MODEM EN 1998.");
    document.body.style.transform = `rotate(${Math.random() * 180}deg)`;
    setTimeout(() => {
      navigate('/panel');
    }, 2000);
  };

  const moveButton = (e) => {
    if (clickCount > 2) return; // let them click after 3 tries
    e.target.style.position = 'fixed';
    e.target.style.top = `${Math.random() * 80 + 10}vh`;
    e.target.style.left = `${Math.random() * 80 + 10}vw`;
  };

  return (
    <div className="troll-body">
      {showError && (
        <div className="fake-error">
          <div className="fake-error-header">
            <span>Critical Error</span>
            <button onClick={() => setShowError(false)} style={{background: 'red', color: 'white', border: 'none', cursor: 'pointer'}}>X</button>
          </div>
          <div className="fake-error-body">
            <span style={{fontSize: '40px'}}>❌</span>
            <p>Windows a détecté que ce site est trop stylé pour votre PC.</p>
          </div>
          <button className="fake-error-btn" onClick={() => setShowError(false)}>OK</button>
        </div>
      )}

      <div className="troll-marquee">
        🔥 GESTION ADS 🔥 GESTION ADS 🔥 THE BEST TROLL SITE 🔥 TROP BIEN 🔥
      </div>

      <h1 className="troll-title">Gesti0n adS</h1>
      
      <marquee direction="up" scrollamount="15" style={{ height: '150px', fontSize: '3rem', color: 'cyan' }}>
        🚀🚀🚀 STONKS 🚀🚀🚀
      </marquee>

      <div className="buggy-container">
        <button 
          className="troll-btn btn-runaway" 
          onMouseEnter={moveButton}
          onClick={handleGrab}
        >
          BOUTON GRAB
        </button>

        <button 
          className="troll-btn btn-reseau" 
          onClick={handleReseau}
        >
          RÉSEAU (ne pas cliquer)
        </button>
      </div>

      <div className="glitch-box">
        <img src="https://media.giphy.com/media/11ISwbgCxEzMyY/giphy.gif" alt="troll" width="100%" height="100%" style={{opacity: 0.5}} />
      </div>
      
      {Array.from({ length: 5 }).map((_, i) => (
        <marquee key={i} direction={i % 2 === 0 ? "left" : "right"} scrollamount={Math.random() * 40 + 10} style={{ marginTop: '20px' }}>
          <img src="https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif" alt="rick" width="100" />
        </marquee>
      ))}
    </div>
  );
}
