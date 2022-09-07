import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function Layout() {
  return (
    <div className="bg-sky-50 min-h-screen min-w-full absolute flex flex-col ">
      <NavBar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
