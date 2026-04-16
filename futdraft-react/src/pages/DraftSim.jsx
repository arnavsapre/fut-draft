import React from 'react'
import './DraftSim.css'
import img442 from '../../formations/442.png'
import img433 from '../../formations/433.png'
import img451 from '../../formations/451.png'
import img4141 from '../../formations/4141.png'
import img541 from '../../formations/541.png'
import img4321 from '../../formations/4321.png'

const formationImages = {
  '442': img442,
  '433': img433,
  '451': img451,
  '4141': img4141,
  '541': img541,
  '4321': img4321
};

const formations = {
  '442': [
    { label: 'GK',  top: '88%', left: '50%' }, { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' }, { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' }, { label: 'LM',  top: '45%', left: '30%' },
    { label: 'CM',  top: '45%', left: '42%' }, { label: 'CM',  top: '45%', left: '58%' },
    { label: 'RM',  top: '45%', left: '70%' }, { label: 'ST',  top: '25%', left: '42%' },
    { label: 'ST',  top: '25%', left: '58%' }
  ],
  '433': [
    { label: 'GK',  top: '88%', left: '50%' }, { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' }, { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' }, { label: 'CM',  top: '50%', left: '35%' },
    { label: 'CM',  top: '55%', left: '50%' }, { label: 'CM',  top: '50%', left: '65%' },
    { label: 'LW',  top: '28%', left: '35%' }, { label: 'ST',  top: '22%', left: '50%' },
    { label: 'RW',  top: '28%', left: '65%' }
  ],
  '451': [
    { label: 'GK',  top: '88%', left: '50%' }, { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' }, { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' }, { label: 'CM',  top: '55%', left: '50%' },
    { label: 'CAM', top: '40%', left: '35%' }, { label: 'CAM', top: '40%', left: '65%' },
    { label: 'LW',  top: '28%', left: '25%' }, { label: 'RW',  top: '28%', left: '75%' },
    { label: 'ST',  top: '20%', left: '50%' }
  ],
  '4141': [
    { label: 'GK',  top: '88%', left: '50%' }, { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' }, { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' }, { label: 'CDM', top: '60%', left: '50%' },
    { label: 'CM',  top: '45%', left: '38%' }, { label: 'CM',  top: '45%', left: '62%' },
    { label: 'LW',  top: '28%', left: '28%' }, { label: 'RW',  top: '28%', left: '72%' },
    { label: 'ST',  top: '22%', left: '50%' }
  ],
  '541': [
    { label: 'GK',  top: '88%', left: '50%' }, { label: 'LWB', top: '68%', left: '15%' },
    { label: 'CB',  top: '75%', left: '35%' }, { label: 'CB',  top: '78%', left: '50%' },
    { label: 'CB',  top: '75%', left: '65%' }, { label: 'RWB', top: '68%', left: '85%' },
    { label: 'CM',  top: '52%', left: '42%' }, { label: 'CM',  top: '52%', left: '58%' },
    { label: 'LW',  top: '30%', left: '35%' }, { label: 'RW',  top: '30%', left: '65%' },
    { label: 'ST',  top: '18%', left: '50%' }
  ],
  '4321': [
    { label: 'GK',  top: '88%', left: '50%' }, { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' }, { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' }, { label: 'CM',  top: '55%', left: '35%' },
    { label: 'CM',  top: '58%', left: '50%' }, { label: 'CM',  top: '55%', left: '65%' },
    { label: 'CAM', top: '35%', left: '42%' }, { label: 'CAM', top: '35%', left: '58%' },
    { label: 'ST',  top: '18%', left: '50%' }
  ]
};

class DraftSim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 'start',
      activeFormation: null,
      teamPlayers: new Array(11).fill(null),
      modalOpen: false,
      activeSlot: null,
      playerChoices: [],
      allDbPlayers: [],
      selectedLeague: null 
    };
  }

  async componentDidMount() {
    // Detect league from navigation state (passed from League.jsx)
    const passedLeague = window.history.state?.usr?.selectedLeague;
    this.setState({ selectedLeague: passedLeague });

    try {
      const response = await fetch('http://localhost:5000/api/players');
      const data = await response.json();
      this.setState({ allDbPlayers: data });
    } catch (err) {
      console.error("❌ API Fetch Error:", err);
    }
  }

  cleanName(name) {
    return name ? name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z\s]/g, "") : "Player";
  }

  getPlayersForPosition(targetPos) {
    const { allDbPlayers, selectedLeague } = this.state;
    if (allDbPlayers.length === 0) return [];

    const search = targetPos.toUpperCase();

    // 1. Filter by Position AND League (if mode is active)
    let pool = allDbPlayers.filter(p => {
      const pPos = (p.Position || "").toUpperCase();
      const pLeague = p.League || "";
      
      const matchesPosition = pPos.includes(search);
      const matchesLeague = selectedLeague ? pLeague === selectedLeague : true;

      return matchesPosition && matchesLeague;
    });

    // 2. Weighted Random: Grab Top 30 highest rated for quality selection
    const topHeavyPool = [...pool].sort((a, b) => (b.Overall || 0) - (a.Overall || 0)).slice(0, 30);
    const finalFive = topHeavyPool.sort(() => 0.5 - Math.random()).slice(0, 5);

    return finalFive.map(p => ({
      name: this.cleanName(p.Name),
      rating: p.Overall,
      team: p.Team,
      league: p.League 
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
    const { phase, activeFormation, teamPlayers, modalOpen, playerChoices, activeSlot, selectedLeague } = this.state;

    return (
      <div className="draft-container" style={{ background: '#0a0a0a', minHeight: '100vh', padding: '20px', color: 'white' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h2 style={{ color: 'gold', textTransform: 'uppercase' }}>
            {selectedLeague ? `${selectedLeague} Mode` : "Global Draft Mode"}
          </h2>
        </div>

        {phase === 'start' && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h1>SELECT FORMATION</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
              {Object.keys(formations).map(f => (
                <button key={f} onClick={() => this.selectFormation(f)} 
                  style={{
                    padding: '0',
                    background: '#111',
                    color: 'gold',
                    border: '2px solid gold',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    width: '160px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    textAlign: 'center'
                  }}>
                  <div style={{ position: 'relative', width: '100%', height: '140px', background: '#000' }}>
                    <img src={formationImages[f]} alt={`${f} formation`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#111' }}>
                    {f}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'draft' && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '850px', margin: '0 auto' }}>
            {/* Pitch Container */}
            <div style={{ position: 'relative', background: 'url(/pitch.png)', backgroundSize: '100% 100%', height: '620px', borderRadius: '15px', border: '4px solid #333' }}>
              
              {formations[activeFormation].map((pos, i) => {
                const player = teamPlayers[i];
                return (
                  <div key={i} onClick={() => this.openPlayerModal(pos.label, i)}
                    style={{
                      position: 'absolute', top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)',
                      width: '82px', height: '112px', 
                      background: player ? 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)' : 'rgba(255,255,255,0.1)',
                      border: player ? '2px solid white' : '2px solid gold', borderRadius: '8px', 
                      cursor: 'pointer', zIndex: 10, display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                    }}>
                    {player ? (
                      <div style={{ color: '#000', width: '100%' }}>
                        <div style={{ fontWeight: '900', fontSize: '22px' }}>{player.rating}</div>
                        <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{player.name.split(' ').pop()}</div>
                        {/* Display League on Card */}
                        <div style={{ fontSize: '7px', opacity: 0.8, fontWeight: 'bold' }}>{player.league}</div>
                      </div>
                    ) : <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{pos.label}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {modalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#111', padding: '30px', borderRadius: '25px', border: '3px solid gold', width: '90%', maxWidth: '850px' }}>
              <h2 style={{ textAlign: 'center', color: 'gold' }}>PICK {activeSlot?.position}</h2>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                {playerChoices.map((p, i) => (
                  <div key={i} onClick={() => this.selectPlayer(p)} 
                    style={{ width: '135px', background: 'linear-gradient(to bottom, #fde68a, #fbbf24)', padding: '15px', borderRadius: '10px', color: '#000', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: '32px', fontWeight: '900' }}>{p.rating}</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{p.name}</div>
                    <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.7 }}>{p.league}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => this.setState({ modalOpen: false })} style={{ width: '100%', marginTop: '25px', padding: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>CANCEL</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DraftSim;