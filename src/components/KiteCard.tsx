import { Kite } from '../pages/SingleLinePage';

import kiteImage from '../assets/kite-placeholder.png';

export default function KiteCard({ kite }: { kite: Kite }) {
  return (
    <div className="bg-white  rounded-3xl  shadow-md border-black p-6 max-w-sm">
      <h1>{kite.name}</h1>
      <div>
        <img src={kiteImage} alt={kite.name} />
      </div>
      <div className="text-center">
        <div>{kite.size}</div>
        <div className="">{kite.details}</div>
        <div>{kite.isBeginner ? 'Kezdo' : ''}</div>
        <div>{kite.material}</div>
      </div>
    </div>
  );
}
