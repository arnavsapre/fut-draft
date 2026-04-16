import React from 'react'
import './DraftSim.css'

// ── Updated Formation Data (Removing RM/LM) ──────────────────────────────────────
const formations = {
  '433': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'CM',  top: '50%', left: '35%' },
    { label: 'CM',  top: '55%', left: '50%' },
    { label: 'CM',  top: '50%', left: '65%' },
    { label: 'LW',  top: '28%', left: '35%' },
    { label: 'ST',  top: '22%', left: '50%' },
    { label: 'RW',  top: '28%', left: '65%' },
  ],
  '4231': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'CDM', top: '58%', left: '42%' },
    { label: 'CDM', top: '58%', left: '58%' },
    { label: 'CAM', top: '40%', left: '35%' },
    { label: 'CAM', top: '38%', left: '50%' },
    { label: 'CAM', top: '40%', left: '65%' },
    { label: 'ST',  top: '22%', left: '50%' },
  ],
  '4141': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'CDM', top: '60%', left: '50%' },
    { label: 'CM',  top: '45%', left: '38%' },
    { label: 'CM',  top: '45%', left: '62%' },
    { label: 'LW',  top: '28%', left: '30%' },
    { label: 'RW',  top: '28%', left: '70%' },
    { label: 'ST',  top: '22%', left: '50%' },
  ],
}

class DraftSim extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phase: 'start',
      activeFormation: null,
      teamPlayers: new Array(11).fill(null),
      modalOpen: false,
      activeSlot: null,
      playerChoices: [],
      allDbPlayers: [] 
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000/api/players');
      const data = await response.json();
      this.setState({ allDbPlayers: data });
    } catch (err) {
      console.error("❌ API Fetch Error:", err);
    }
  }

  // Fisher-Yates Shuffle for true mathematical randomness
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getPlayersForPosition(targetPos) {
    const { allDbPlayers } = this.state;
    if (allDbPlayers.length === 0) return [];

    const search = targetPos.toUpperCase();

    // 1. Filter: Find players matching the specific position label [cite: 1, 2, 3]
    let filtered = allDbPlayers.filter(p => {
      const dbPos = (p.Position || p.position || "").toUpperCase();
      return dbPos.split(',').some(pos => pos.trim() === search) || dbPos.includes(search);
    });

    // 2. Dynamic Pool: Fallback to high-rated general pool if matches are low
    if (filtered.length < 5) {
        filtered = allDbPlayers.filter(p => (p.Overall || p.overall) >= 80);
    }

    // 3. Mathematical Randomization & Selection
    const randomizedPool = this.shuffleArray([...filtered]);
    return randomizedPool.slice(0, 5).map(p => ({
      name: p.Name || p.name,
      rating: p.Overall || p.overall,
      team: p.Team || p.team,
      position: p.Position || p.position
    }));
  }

  selectFormation(id) {
    this.setState({ activeFormation: id, teamPlayers: new Array(11).fill(null), phase: 'draft' });
  }

  openPlayerModal(position, index) {
    const choices = this.getPlayersForPosition(position);
    this.setState({ activeSlot: { index, position }, playerChoices: choices, modalOpen: true });
  }

  selectPlayer(player) {
    const updated = [...this.state.teamPlayers];
    updated[this.state.activeSlot.index] = player;
    this.setState({ teamPlayers: updated, modalOpen: false });
  }

  render() {
    const { phase, activeFormation, teamPlayers, modalOpen, playerChoices, activeSlot } = this.state;

    return (
      <div className="draft-container" style={{ background: '#121212', minHeight: '100vh', color: 'white', padding: '20px' }}>
        
        {phase === 'start' && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Select Formation</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
              {Object.keys(formations).map(f => (
                <button key={f} onClick={() => this.selectFormation(f)} 
                  style={{ padding: '15px 30px', background: '#222', color: 'gold', border: '2px solid gold', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'draft' && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ position: 'relative', background: 'url(/pitch.png)', backgroundSize: '100% 100%', height: '600px', borderRadius: '15px', border: '3px solid #333' }}>
              {formations[activeFormation].map((pos, i) => {
                const player = teamPlayers[i];
                return (
                  <div key={i} onClick={() => this.openPlayerModal(pos.label, i)}
                    style={{
                      position: 'absolute', top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)',
                      width: '80px', height: '110px', 
                      background: player ? 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)' : 'rgba(255,255,255,0.15)',
                      border: player ? '2px solid #fff' : '2px solid gold', borderRadius: '8px', 
                      cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                    }}>
                    {player ? (
                      <div style={{ color: '#000' }}>
                        <div style={{ fontWeight: '900', fontSize: '22px' }}>{player.rating}</div>
                        <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{player.name.split(' ').pop()}</div>
                        <div style={{ fontSize: '8px', fontWeight: '600' }}>{player.team}</div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{pos.label}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {modalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '2px solid gold', width: '90%', maxWidth: '800px' }}>
              <h2 style={{ textAlign: 'center', color: 'gold' }}>Draft {activeSlot.position}</h2>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                {playerChoices.map((p, i) => (
                  <div key={i} onClick={() => this.selectPlayer(p)} 
                    style={{ width: '135px', background: 'linear-gradient(to bottom, #fde68a, #fbbf24)', padding: '15px', borderRadius: '10px', color: '#000', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{p.rating}</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', minHeight: '35px' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '5px' }}>{p.team}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => this.setState({ modalOpen: false })} 
                style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default DraftSim;