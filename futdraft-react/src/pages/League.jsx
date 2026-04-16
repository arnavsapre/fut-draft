import { Link } from 'react-router-dom'

function League() {
  return (
    <>
      <h1 className="welcome">League-based Draft Mode</h1>

      <div>
        <h3 align="center" style={{ color: '#cccccc' }}>
          Welcome to the league-based draft. In this game, you can choose your favorite league and build a team using players selected randomly from all teams across the league.
        </h3>
      </div>

      <div className="content-container">
        <div className="d1">
          <h3 align="center">Premier League</h3>
          <img src="/prem.png" alt="Premier League" style={{ width: '100%', height: '200px', objectFit: 'fill' }} />
          <p>Draft players exclusively from England's top league.</p>
          <Link to="/draft" className="play-now-btn">Enter Draft</Link>
        </div>

        <div className="d1">
          <h3 align="center">La Liga</h3>
          <img src="/laliga.png" alt="La Liga" style={{ width: '100%', height: '200px', objectFit: 'fill' }} />
          <p>Draft players exclusively from Spain's top league.</p>
          <Link to="/draft" className="play-now-btn">Enter Draft</Link>
        </div>

        <div className="d1">
          <h3 align="center">Bundesliga</h3>
          <img src="/bundesliga.png" alt="Bundesliga" style={{ width: '100%', height: '200px', objectFit: 'scale-down' }} />
          <p>Draft players exclusively from Germany's top league.</p>
          <Link to="/draft" className="play-now-btn">Enter Draft</Link>
        </div>

        <div className="d1">
          <h3 align="center">Serie A</h3>
          <img src="/seriea.png" alt="Serie A" style={{ width: '100%', height: '200px', objectFit: 'fill' }} />
          <p>Draft players exclusively from Italy's top league.</p>
          <Link to="/draft" className="play-now-btn">Enter Draft</Link>
        </div>
      </div>
    </>
  )
}

export default League
