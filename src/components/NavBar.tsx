import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

// assets
// TODO add basket svg
import hamburgerMenu from '../assets/hamburger-menu.svg';
import logo from '../assets/logo.svg';

export default function NavBar() {
  const sideBarRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideBarRef]);

  return (
    // TODO NEEDS REWORK
    <nav>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="flex justify-between  p-6">
          <div className="flex justify-center">
            <NavLink to="/" className={'w-16'}>
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="flex items-center space-x-6">
            <NavLink to="/egyzsinoros">Egyzsinóros</NavLink>
            <NavLink to="/ketzsinoros">Kétzsinóros</NavLink>
            <NavLink to="/anyagok">Anyagok</NavLink>
            <NavLink to="/kosar">🛒</NavLink>
          </div>
        </div>
      </div>

      {/* Mobile SideBar */}
      <div className="block md:hidden">
        {isOpen ? (
          <div className="fixed flex flex-col bg-sky-300 w-52 h-screen justify-between p-6" ref={sideBarRef}>
            <div className="flex justify-center">
              <NavLink to="/" className={'w-20'}>
                <img src={logo} alt="logo" onClick={toggleSideBar} />
              </NavLink>
            </div>
            <div className="flex flex-col justify-between space-y-6 items-center">
              <NavLink to="/egyzsinoros" onClick={toggleSideBar}>
                Egyzsinóros
              </NavLink>
              <NavLink to="/ketzsinoros" onClick={toggleSideBar}>
                Kétzsinóros
              </NavLink>
              <NavLink to="/anyagok" onClick={toggleSideBar}>
                Anyagok
              </NavLink>
              <NavLink to="/kosar" onClick={toggleSideBar}>
                🛒
              </NavLink>
            </div>
          </div>
        ) : (
          <button id="menu-btn" className="fixed bottom-2 left-5" onClick={toggleSideBar}>
            <img src={hamburgerMenu} alt="hamburger menu" />
          </button>
        )}
      </div>
    </nav>
  );
}
