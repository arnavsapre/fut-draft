import React from 'react'
import './Database.css'

class Database extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'players',
      activeAttr: 'Base'
    }
  }

  // Use an arrow function to ensure 'this' refers to the component instance
  setTab = (tab) => {
    // Reset attr to 'Base' whenever the tab changes
    this.setState({ activeTab: tab, activeAttr: 'Base' })
  }

  render() {
    const { activeTab, activeAttr } = this.state

    const playerAttrs = ['Base', 'Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending']
    const gkAttrs = ['Base', 'Diving', 'Handling', 'Kicking', 'Reflexes', 'Speed', 'Positioning']
    const attrs = activeTab === 'gk' ? gkAttrs : playerAttrs

    return (
      // 1. Wrap in a Fragment because you have multiple top-level elements
      <>
        <h1 className="welcome">Player Database</h1>
        <div className="db-container">
          <div className="db-toolbar">
            <input type="text" className="search-box" placeholder="Search by name" />

            <div className="position-toggle">
              <button
                className={`toggle-btn${activeTab === 'players' ? ' active' : ''}`}
                id="btn-players"
                onClick={() => this.setTab('players')}
              >
                Players
              </button>
              <button
                className={`toggle-btn${activeTab === 'gk' ? ' active' : ''}`}
                id="btn-gk"
                onClick={() => this.setTab('gk')}
              >
                GK
              </button>
            </div>

            <div className="attributes-filter" id="attr-filter">
              {attrs.map(attr => (
                <button
                  key={attr}
                  className={`attr-btn${activeAttr === attr ? ' active' : ''}`}
                  onClick={() => this.setState({ activeAttr: attr })}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Database