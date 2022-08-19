import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function Layout() {
  return (
    <div className="bg-sky-50 min-h-screen flex flex-col ">
      <NavBar />
      <div className="container mx-auto flex-grow grid">
        <Outlet />
      </div>
    </div>
  );
}
