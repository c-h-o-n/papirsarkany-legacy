import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="bg-sky-50 h-screen">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
