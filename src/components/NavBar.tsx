import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="hidden md:flex items-center justify-between">
        <div className="flex space-x-12">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/anyagok">Anyagok</NavLink>
          <NavLink to="/ketzsinoros">Kétzsinóros</NavLink>
          <NavLink to="/egyzsinoros">Egyzsinóros</NavLink>
        </div>

        <NavLink to="/kosar">🛒</NavLink>
      </div>
      <button id="menu-btn" className="block md:hidden">
        Hamburger button works!
      </button>
    </nav>
  );
}
