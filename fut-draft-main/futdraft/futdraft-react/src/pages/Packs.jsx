import React from 'react'
import './Packs.css'

function Packs() {
  return (
    <>
      <h1 className="welcome">Store / Packs</h1>
      <div className="packs-container">
        <div className="packs-grid">
          <div className="pack-card">
            <div className="pack-image-container">
              <img src="/pack1.1.png" className="pack-overlay" alt="" />
              <img src="/pack1.png" className="pack-base" alt="" />
            </div>
            <h3>Pack 1</h3>
            <p><b>GOLD PACK 10 PLAYERS ALL GOLD</b></p>
          </div>
          <div className="pack-card">
            <div className="pack-image-container">
              <img src="/pack2.png" className="pack-overlay" alt="Pack 2 Light" />
              <img src="/pack1.png" className="pack-base" alt="Pack 2" />
            </div>
            <h3>Pack 2</h3>
            <p><b>SILVER PACK 10 PLAYERS ALL SILVER</b></p>
          </div>
          <div className="pack-card">
            <div className="pack-image-container">
              <img src="/pack3.png" className="pack-overlay" alt="Pack 3 Light" />
              <img src="/pack1.png" className="pack-base" alt="Pack 3" />
            </div>
            <h3>Pack 3</h3>
            <p><b>BRONZE PACK 10 PLAYERS ALL BRONZE</b></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Packs
