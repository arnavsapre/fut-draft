import { Link } from 'react-router-dom'

function Classic() {
  return (
    <>
      <h1 className="welcome">Classic Draft Mode</h1>
      <div className="content-container">
        <div className="d1" style={{ width: '100%', textAlign: 'center' }}>
          <img src="/classic-draft.jpg" alt="Classic Draft" style={{ maxWidth: '600px', height: 'auto', marginBottom: '20px' }} />
          <h3>Start Your Classic Draft Journey!</h3>
          <p>Welcome to the Classical Draft! Build a squad from scratch by selecting one player from 5 random choices. Try your luck at creating the ultimate squad.</p>
          <Link to="/draft" className="play-now-btn">Enter Draft Sim</Link>
        </div>
      </div>
    </>
  )
}

export default Classic
