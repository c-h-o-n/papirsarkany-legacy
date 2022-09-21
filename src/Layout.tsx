import { Slide, ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function Layout() {
  return (
    <div className="bg-sky-50 min-h-screen min-w-full absolute flex flex-col ">
      <NavBar />
      <ToastContainer
        position="bottom-center"
        limit={1}
        transition={Slide}
        enableMultiContainer
        autoClose={3000}
        progressStyle={{ background: 'unset' }}
        progressClassName={'!bg-sky-300'}
      />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
}
