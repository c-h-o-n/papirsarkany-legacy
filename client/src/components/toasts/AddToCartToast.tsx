import { useNavigate } from 'react-router-dom';

export default function AddToCartToastMessage() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      Sikeresen hozzáadva a{' '}
      <button className="font-bold text-sky-400" type="button" onClick={() => navigate('/kosar')}>
        kosárhoz
      </button>
      !
    </div>
  );
}
