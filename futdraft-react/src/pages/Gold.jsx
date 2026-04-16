import { Link } from 'react-router-dom'

function Gold() {
  return (
    <>
      <h1 className="welcome">Gold Draft Mode</h1>
      <div className="content-container">
        <div className="d1" style={{ width: '100%', textAlign: 'center' }}>
          <img src="/gold-draft.jpg" alt="Gold Draft" style={{ maxWidth: '600px', height: 'auto', marginBottom: '20px' }} />
          <h3>Start Your Gold Draft!</h3>
          <p>A special version of Draft with common and rare gold players only!</p>
          <Link to="/draft" className="play-now-btn">Enter Draft Sim</Link>
        </div>
      </div>
    </>
  )
}

export default Gold
