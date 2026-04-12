import './Packs.css'

function Packs() {
  return (
    <div className="packs-container">
      <h2>Packs</h2>
      <div className="packs-grid">
        <div className="pack-card">
          <div className="pack-image-container">
            <img src="/pack1.1.png" alt="Pack 1 Overlay" className="pack-overlay" />
            <img src="/pack1.png" alt="Pack 1" className="pack-base" />
          </div>
          <h3>Pack 1</h3>
          <p><b>GOLD PACK 10 PLAYERS ALL GOLD</b></p>
        </div>
        <div className="pack-card">
          <div className="pack-image-container">
            <img src="/pack2.png" alt="Pack 2 Light/Overlay" className="pack-overlay" />
            <img src="/pack1.png" alt="Pack 2" className="pack-base" />
          </div>
          <h3>Pack 2</h3>
          <p><b>SILVER PACK 10 PLAYERS ALL SILVER</b></p>
        </div>
        <div className="pack-card">
          <div className="pack-image-container">
            <img src="/pack3.png" alt="Pack 3 Light/Overlay" className="pack-overlay" />
            <img src="/pack1.png" alt="Pack 3" className="pack-base" />
          </div>
          <h3>Pack 3</h3>
          <p><b>BRONZE PACK 10 PLAYERS ALL BRONZE</b></p>
        </div>
      </div>
    </div>
  )
}

export default Packs
