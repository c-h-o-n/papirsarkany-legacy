import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

// assets
import hamburgerMenu from '../assets/hamburger-menu.svg';
import logo from '../assets/logo.svg';
import bottomKite from '../assets/bottom-kite.svg';
import Cart from './Cart';

// HACK z-indexes
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const sideBarRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target) && window.innerWidth <= 768) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideBarRef]);

  const toggleSideBar = () => {
    // THINK more maintainable way
    if (window.innerWidth <= 768) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <nav className="z-50">
        <div className={`${isOpen ? ' block' : 'hidden'} md:block`}>
          <div
            className="fixed  flex flex-col bg-sky-300 w-52 h-full justify-between p-6 md:flex md:flex-row md:bg-transparent md:static md:w-full md:h-auto"
            ref={sideBarRef}
          >
            <div className="flex justify-center">
              <NavLink to="/" className={'w-20 md:w-16'}>
                <img src={logo} alt="logo" onClick={toggleSideBar} />
              </NavLink>
            </div>
            <div className="flex flex-col justify-between space-y-6 items-center md:flex-row md:space-y-0 md:space-x-12">
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
                <Cart />
              </NavLink>
            </div>
          </div>

          {/* Backdrop */}
          <div className="absolute -z-10  w-screen h-screen md:hidden"></div>
        </div>

        {/* Bottom Flying Kite */}
        <div className={`${isOpen ? 'block' : 'hidden'}`}>
          <img className="fixed -bottom-16 -right-6 bottom-kite-bounce w-36 md:hidden" src={bottomKite} alt="bottom-kite" />
        </div>

        {/* Hamburger menu */}
        <div className={`${isOpen ? ' hidden' : 'block'}`}>
          <button className={`fixed bottom-2 left-5  md:hidden`} id="menu-btn" onClick={toggleSideBar}>
            <img src={hamburgerMenu} alt="hamburger menu" />
          </button>
        </div>
      </nav>
    </>
  );
}
