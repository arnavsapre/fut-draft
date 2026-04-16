import React from 'react';
import { Link } from 'react-router-dom';

function League() {
  const leagues = [
    { name: "Premier League", img: "/prem.png", desc: "England's Top Flight" },
    { name: "La Liga", img: "/laliga.png", desc: "Spain's Best" },
    { name: "Bundesliga", img: "/bundesliga.png", desc: "Germany's Finest" },
    { name: "Serie A", img: "/seriea.png", desc: "Italy's Elite" }
  ];

  return (
    <div className="league-container" style={{ background: '#111', minHeight: '100vh', padding: '40px', color: 'white' }}>
      <h1 align="center" style={{ color: 'gold', fontSize: '3rem' }}>League Draft Mode</h1>
      <p align="center" style={{ opacity: 0.7 }}>Build a squad using players exclusively from your chosen league.</p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
        {leagues.map((league) => (
          <div key={league.name} className="league-card" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '15px', border: '1px solid #333', textAlign: 'center', width: '220px' }}>
            <img src={league.img} alt={league.name} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <h3 style={{ margin: '15px 0' }}>{league.name}</h3>
            <p style={{ fontSize: '12px', minHeight: '40px' }}>{league.desc}</p>
            <Link 
              to="/draft" 
              state={{ selectedLeague: league.name }} 
              className="play-now-btn"
              style={{ display: 'block', background: 'gold', color: 'black', padding: '10px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}
            >
              Enter Draft
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default League;
