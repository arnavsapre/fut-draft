function Home() {
  return (
    <>
      <h1 className="welcome">Welcome To Football Draft League</h1>
      <div className="content-container">
        <div className="d1">
          <img src="/classic-draft.jpg" alt="Classic Draft" />
          <h3>Classic Draft</h3>
          <p>Classic Draft with a mix of special, rare and common player items.</p>
        </div>
        <div className="d1">
          <img src="/highrated-draft.jpg" alt="83+ Rated Draft" />
          <h3>83+ Rated Draft</h3>
          <p>A special version of Draft with high rated player items only!</p>
        </div>
        <div className="d1">
          <img src="/gold-draft.jpg" alt="Gold Draft" />
          <h3>Gold Draft</h3>
          <p>A special version of Draft with common and rare gold, silver and bronze players only!</p>
        </div>
      </div>
    </>
  )
}

export default Home
