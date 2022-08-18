import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="text-center flex justify-center h-screen items-center bg-sky-50">
        <Outlet />
      </div>
    </>
  );
}
