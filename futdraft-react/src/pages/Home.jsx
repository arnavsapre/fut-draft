import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1 className="welcome">Welcome To Football Draft League</h1>
      <div className="content-container">
        <div className="d1">
          <img src="/1.jpg" alt="Classic Draft" onError={(e) => { e.target.src = '/classic-draft.jpg' }} />
          <h3>Classic Draft</h3>
          <p>Classic Draft with a mix of special,rare and common player items.</p>
          <Link to="/classic" className="play-now-btn">Play Now</Link>
        </div>
        <div className="d1">
          <img src="/2.jpg" alt="League-based draft" onError={(e) => { e.target.src = '/highrated-draft.jpg' }} />
          <h3>League-based draft</h3>
          <p>A special version of Draft with players from one specific league!</p>
          <Link to="/league" className="play-now-btn">Play Now</Link>
        </div>
        <div className="d1">
          <img src="/3.jpg" alt="Gold Draft" onError={(e) => { e.target.src = '/gold-draft.jpg' }} />
          <h3>Gold Draft</h3>
          <p>A special version of Draft with common and rare gold, silver and bronze players only!</p>
          <Link to="/gold" className="play-now-btn">Play Now</Link>
        </div>
      </div>
    </>
  )
}

export default Home
