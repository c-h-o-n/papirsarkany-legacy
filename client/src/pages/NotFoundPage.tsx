import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="absolute grid items-center h-screen inset-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-5xl ">Nem létező oldal.</h1>
        <h1 className="text-base">
          Vissza a{' '}
          <span className="font-bold underline text-sky-400">
            <Link to="/">főoldalra</Link>
          </span>{' '}
          🪁
        </h1>
      </div>
    </div>
  );
}
