import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <ul>
      <li><NavLink to="/home">Home</NavLink></li>
      <li><NavLink to="/database">Database</NavLink></li>
      <li><NavLink to="/packs">Packs</NavLink></li>
      <li><NavLink to="/draft">Draft Sim</NavLink></li>
    </ul>
  )
}

export default Navbar
