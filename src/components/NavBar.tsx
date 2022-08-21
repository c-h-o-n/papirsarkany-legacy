import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

// assets
import hamburgerMenu from '../assets/hamburger-menu.svg';
import logo from '../assets/logo.svg';
import basket from '../assets/basket.svg';
import bottomKite from '../assets/bottom-kite.svg';

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
    <nav className="z-50">
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
            <NavLink to="/kosar">
              <img src={basket} alt="kosár" className="w-6" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile SideBar */}
      <div className="block md:hidden">
        {isOpen ? (
          <>
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

            <img className="fixed -bottom-16 right-0 bottom-kite-bounce w-36" src={bottomKite} alt="bottom-kite" />
          </>
        ) : (
          <button className="fixed bottom-2 left-5" id="menu-btn" onClick={toggleSideBar}>
            <img src={hamburgerMenu} alt="hamburger menu" />
          </button>
        )}
      </div>
    </nav>
  );
}
