import React from 'react'
import './DraftSim.css'

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
    { label: 'CAM', top: '40%', left: '32%' },
    { label: 'CAM', top: '38%', left: '50%' },
    { label: 'CAM', top: '40%', left: '68%' },
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
    { label: 'LW',  top: '28%', left: '28%' },
    { label: 'RW',  top: '28%', left: '72%' },
    { label: 'ST',  top: '22%', left: '50%' },
  ],
  '451': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'CM',  top: '55%', left: '50%' },
    { label: 'CAM', top: '40%', left: '35%' },
    { label: 'CAM', top: '40%', left: '65%' },
    { label: 'LW',  top: '28%', left: '25%' },
    { label: 'RW',  top: '28%', left: '75%' },
    { label: 'ST',  top: '20%', left: '50%' },
  ],
  '541': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LWB', top: '68%', left: '15%' },
    { label: 'CB',  top: '75%', left: '35%' },
    { label: 'CB',  top: '78%', left: '50%' },
    { label: 'CB',  top: '75%', left: '65%' },
    { label: 'RWB', top: '68%', left: '85%' },
    { label: 'CM',  top: '52%', left: '42%' },
    { label: 'CM',  top: '52%', left: '58%' },
    { label: 'LW',  top: '30%', left: '35%' },
    { label: 'RW',  top: '30%', left: '65%' },
    { label: 'ST',  top: '18%', left: '50%' },
  ]
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

  // Simplified cleaning: Removes special chars but keeps it fast
  cleanString(str) {
    return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z\s]/g, "") : "";
  }

  getPlayersForPosition(targetPos) {
    const { allDbPlayers } = this.state;
    if (allDbPlayers.length === 0) return [];

    const search = targetPos.toUpperCase();

    // 1. Filter by position
    let pool = allDbPlayers.filter(p => {
      const pPos = (p.Position || "").toUpperCase();
      return pPos.includes(search);
    });

    // 2. If pool is empty for specific pos (like LWB), grab general players
    if (pool.length < 10) pool = allDbPlayers.filter(p => p.Overall >= 75);

    // 3. Simple Weighting: Sort by rating first, then take a random slice
    // This makes sure you get good players 80% of the time
    const topHeavyPool = [...pool].sort((a, b) => b.Overall - a.Overall);
    
    // Grab the top 20 available players for that position and pick 5 randomly
    const bestChoices = topHeavyPool.slice(0, 20);
    const finalFive = bestChoices.sort(() => 0.5 - Math.random()).slice(0, 5);

    return finalFive.map(p => ({
      name: this.cleanString(p.Name),
      rating: p.Overall,
      team: p.Team,
      position: p.Position
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
      <div className="draft-container" style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
        
        {phase === 'start' && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <h1 style={{ color: 'gold', fontSize: '3rem', marginBottom: '40px' }}>FUT DRAFT</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              {Object.keys(formations).map(f => (
                <button key={f} onClick={() => this.selectFormation(f)} 
                  style={{ padding: '20px 40px', background: '#1a1a1a', color: 'gold', border: '2px solid gold', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'draft' && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ position: 'relative', background: 'url(/pitch.png)', backgroundSize: '100% 100%', height: '620px', borderRadius: '15px', border: '4px solid #222', boxShadow: '0 0 50px rgba(0,0,0,0.8)' }}>
              {formations[activeFormation].map((pos, i) => {
                const player = teamPlayers[i];
                return (
                  <div key={i} onClick={() => this.openPlayerModal(pos.label, i)}
                    style={{
                      position: 'absolute', top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)',
                      width: '80px', height: '110px', 
                      background: player ? 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)' : 'rgba(255,255,255,0.1)',
                      border: player ? '2px solid white' : '2px solid gold', borderRadius: '8px', 
                      cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: 'all 0.3s'
                    }}>
                    {player ? (
                      <div style={{ color: '#000' }}>
                        <div style={{ fontWeight: '900', fontSize: '24px' }}>{player.rating}</div>
                        <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{player.name.split(' ').pop()}</div>
                        <div style={{ fontSize: '8px', marginTop: '3px' }}>{player.team}</div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '14px', fontWeight: 'bold', opacity: 0.7 }}>{pos.label}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <button onClick={() => this.setState({phase: 'start'})} style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Quit Draft</button>
          </div>
        )}

        {modalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#111', padding: '30px', borderRadius: '25px', border: '3px solid gold', width: '90%', maxWidth: '850px' }}>
              <h2 style={{ textAlign: 'center', color: 'gold', fontSize: '2rem', marginBottom: '25px' }}>PICK YOUR {activeSlot.position}</h2>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {playerChoices.map((p, i) => (
                  <div key={i} onClick={() => this.selectPlayer(p)} 
                    style={{ width: '140px', background: 'linear-gradient(to bottom, #fde68a, #fbbf24)', padding: '20px', borderRadius: '12px', color: '#000', textAlign: 'center', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                    <div style={{ fontSize: '38px', fontWeight: '900' }}>{p.rating}</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', minHeight: '35px', marginTop: '5px' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: '8px' }}>{p.team}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => this.setState({ modalOpen: false })} style={{ width: '100%', marginTop: '30px', padding: '15px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default DraftSim;