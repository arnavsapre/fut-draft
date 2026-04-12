import React from 'react'
import './DraftSim.css'

// ── formation data ──────────────────────────────────────────────────────────
const formations = {
  '442': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'LM',  top: '45%', left: '30%' },
    { label: 'CM',  top: '45%', left: '42%' },
    { label: 'CM',  top: '45%', left: '58%' },
    { label: 'RM',  top: '45%', left: '70%' },
    { label: 'ST',  top: '25%', left: '42%' },
    { label: 'ST',  top: '25%', left: '58%' },
  ],
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
  '352': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'CB',  top: '72%', left: '35%' },
    { label: 'CB',  top: '75%', left: '50%' },
    { label: 'CB',  top: '72%', left: '65%' },
    { label: 'LM',  top: '50%', left: '30%' },
    { label: 'CM',  top: '55%', left: '42%' },
    { label: 'CAM', top: '40%', left: '50%' },
    { label: 'CM',  top: '55%', left: '58%' },
    { label: 'RM',  top: '50%', left: '70%' },
    { label: 'ST',  top: '25%', left: '42%' },
    { label: 'ST',  top: '25%', left: '58%' },
  ],
  '4231': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'CDM', top: '58%', left: '42%' },
    { label: 'CDM', top: '58%', left: '58%' },
    { label: 'LAM', top: '42%', left: '35%' },
    { label: 'CAM', top: '40%', left: '50%' },
    { label: 'RAM', top: '42%', left: '65%' },
    { label: 'ST',  top: '25%', left: '50%' },
  ],
  '3412': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'CB',  top: '72%', left: '35%' },
    { label: 'CB',  top: '75%', left: '50%' },
    { label: 'CB',  top: '72%', left: '65%' },
    { label: 'LM',  top: '50%', left: '28%' },
    { label: 'CM',  top: '55%', left: '42%' },
    { label: 'CM',  top: '55%', left: '58%' },
    { label: 'RM',  top: '50%', left: '72%' },
    { label: 'CAM', top: '38%', left: '50%' },
    { label: 'ST',  top: '25%', left: '42%' },
    { label: 'ST',  top: '25%', left: '58%' },
  ],
  '442_2': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'CDM', top: '58%', left: '42%' },
    { label: 'CDM', top: '58%', left: '58%' },
    { label: 'LM',  top: '42%', left: '30%' },
    { label: 'RM',  top: '42%', left: '70%' },
    { label: 'ST',  top: '25%', left: '42%' },
    { label: 'ST',  top: '25%', left: '58%' },
  ],
  '4141': [
    { label: 'GK',  top: '88%', left: '50%' },
    { label: 'LB',  top: '70%', left: '25%' },
    { label: 'CB',  top: '72%', left: '40%' },
    { label: 'CB',  top: '72%', left: '60%' },
    { label: 'RB',  top: '70%', left: '75%' },
    { label: 'CDM', top: '60%', left: '50%' },
    { label: 'LM',  top: '45%', left: '30%' },
    { label: 'CM',  top: '45%', left: '42%' },
    { label: 'CM',  top: '45%', left: '58%' },
    { label: 'RM',  top: '45%', left: '70%' },
    { label: 'ST',  top: '25%', left: '50%' },
  ],
}

const randomNames = [
  'Smith', 'Ronaldo', 'Messi', 'Mbappe', 'Haaland', 'De Bruyne',
  'Van Dijk', 'Alisson', 'Ederson', 'Bellingham', 'Vinicius',
  'Kane', 'Saka', 'Foden', 'Modric', 'Kroos',
]

function generateRandomPlayers(position) {
  return Array.from({ length: 5 }, () => ({
    name:
      randomNames[Math.floor(Math.random() * randomNames.length)] +
      ' ' +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    rating: Math.floor(Math.random() * 15) + 80,
    position,
  }))
}

// ── component ────────────────────────────────────────────────────────────────
class DraftSim extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phase:           'start',         // 'start' | 'draft'
      activeFormation: null,
      teamPlayers:     new Array(11).fill(null),
      modalOpen:       false,
      activeSlot:      null,            // { index, position }
      playerChoices:   [],
      savedDrafts:     [],
    }
  }


  componentDidMount() {
    const raw = localStorage.getItem('savedDrafts')
    if (raw) this.setState({ savedDrafts: JSON.parse(raw) })
  }

  // ── helpers ────────────────────────────────────────────────────────────────
  selectFormation(id) {
    this.setState({
      activeFormation: id,
      teamPlayers:     new Array(11).fill(null),
      phase:           'draft',
    })
  }

  openPlayerModal(position, index) {
    this.setState({
      activeSlot:    { index, position },
      playerChoices: generateRandomPlayers(position),
      modalOpen:     true,
    })
  }

  closePlayerModal() {
    this.setState({ modalOpen: false, activeSlot: null })
  }

  selectPlayer(player) {
    const updated = [...this.state.teamPlayers]
    updated[this.state.activeSlot.index] = player
    this.setState({ teamPlayers: updated }, () => this.closePlayerModal())
  }

  saveDraft() {
    const { teamPlayers, activeFormation, savedDrafts } = this.state
    const filled  = teamPlayers.filter(Boolean)
    const average = Math.round(filled.reduce((s, p) => s + p.rating, 0) / 11)
    const draft   = {
      formation: activeFormation,
      players:   teamPlayers,
      rating:    average,
      date:      new Date().toLocaleString(),
    }
    const updated = [...savedDrafts, draft]
    this.setState({ savedDrafts: updated })
    localStorage.setItem('savedDrafts', JSON.stringify(updated))
    alert('Draft Saved Successfully!')
  }

  resetDraft() {
    this.setState({
      phase:           'start',
      activeFormation: null,
      teamPlayers:     new Array(11).fill(null),
    })
  }

  // ── render ─────────────────────────────────────────────────────────────────
  render() {
    const {
      phase, activeFormation, teamPlayers,
      modalOpen, activeSlot, playerChoices, savedDrafts,
    } = this.state

    const filledCount   = teamPlayers.filter(Boolean).length
    const totalRating   = teamPlayers.filter(Boolean).reduce((s, p) => s + p.rating, 0)
    const teamRating    = filledCount === 11 ? Math.round(totalRating / 11) : 0
    const draftComplete = filledCount === 11

    return (
      <div className="draft-container">
        <h2>Draft Simulator</h2>

        {/* ── HUD ── */}
        {phase === 'draft' && (
          <div id="draft-hud">
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Team Rating: <span id="team-rating">{teamRating}</span>
            </div>
            {draftComplete && (
              <button id="save-draft-btn" onClick={() => this.saveDraft()} style={{ background: '#ea580c' }}>
                Save Draft
              </button>
            )}
          </div>
        )}

        {/* ── Pitch ── */}
        {phase === 'draft' && (
          <div id="pitch-container">
            <div className="pitch">
              <div id="players-container">
                {formations[activeFormation].map((pos, i) => {
                  const player = teamPlayers[i]
                  let displayName = player ? player.name : ''
                  if (displayName.length > 8) displayName = displayName.substring(0, 8) + '..'
                  return (
                    <div
                      key={i}
                      className="player-slot"
                      style={{
                        top:             pos.top,
                        left:            pos.left,
                        backgroundColor: player ? '#fca5a5' : '#ffffff',
                      }}
                      title={pos.label}
                      onClick={() => this.openPlayerModal(pos.label, i)}
                    >
                      {player ? (
                        <>
                          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{player.rating}</span>
                          <br />
                          <span style={{ fontSize: '10px' }}>{displayName}</span>
                        </>
                      ) : '+'}
                    </div>
                  )
                })}
              </div>
            </div>
            <button className="reset-btn" id="reset-btn" onClick={() => this.resetDraft()}>
              Reset Draft
            </button>
          </div>
        )}

        {/* ── Saved Drafts ── */}
        <div id="saved-drafts-container" style={{ marginTop: '40px', borderTop: '2px solid #ccc', paddingTop: '20px' }}>
          <h3>Saved Drafts</h3>
          <div id="saved-drafts-list" className="formation-grid" style={{ marginTop: '15px' }}>
            {savedDrafts.map((draft, idx) => (
              <div
                key={idx}
                className="formation-card"
                style={{ width: '160px', height: 'auto', cursor: 'default', padding: '15px', backgroundColor: '#fff' }}
              >
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '5px' }}>{draft.date}</div>
                <h4 style={{ margin: 0, color: '#334155' }}>Formation: {draft.formation}</h4>
                <h2 style={{ margin: '5px 0', color: '#ea580c' }}>Rating: {draft.rating}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* ── Formation Selection Modal ── */}
        {phase === 'start' && (
          <div id="start-screen" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
              <h2>Choose a formation</h2>
              <br />
              <div className="formation-grid">
                {[
                  ['442',   '4-4-2'],
                  ['433',   '4-3-3'],
                  ['352',   '3-5-2'],
                  ['4231',  '4-2-3-1'],
                  ['3412',  '3-4-1-2'],
                  ['442_2', '4-4-2(2)'],
                  ['4141',  '4-1-4-1'],
                ].map(([id, label]) => (
                  <div key={id} className="formation-card" onClick={() => this.selectFormation(id)}>
                    <div className="mini-pitch"><span>{label}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Player Selection Modal ── */}
        {modalOpen && (
          <div id="player-modal" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content" style={{ maxWidth: '800px' }}>
              <div className="modal-header">
                <h2 id="player-modal-title">Select {activeSlot?.position} Player</h2>
                <span className="close-btn" onClick={() => this.closePlayerModal()}>&times;</span>
              </div>
              <div
                className="player-options-grid"
                id="player-options-grid"
                style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}
              >
                {playerChoices.map((player, i) => (
                  <div key={i} className="player-choice-card" onClick={() => this.selectPlayer(player)}>
                    <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#ea580c' }}>{player.rating}</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>{player.position}</div>
                    <div style={{ fontSize: '13px' }}>{player.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default DraftSim
