import refreshDataIcon from '../assets/icons/refetch-data.svg';

type FetchErrorProps = {
  refetch: () => void;
};

export default function FetchError({ refetch }: FetchErrorProps) {
  return (
    <>
      <button type={'button'} onClick={refetch}>
        <img className="w-32" src={refreshDataIcon} alt="frissítés" />
      </button>

      <p>Nem sikerült lekérni az adatokat.</p>
    </>
  );
}
