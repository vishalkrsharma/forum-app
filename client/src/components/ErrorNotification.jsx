import { useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

export default function ErrorNotification(props) {
  const { error, setError } = props;
  useEffect(() => {
    setTimeout(function () {
      setError(false);
    }, 5000);
  }, [error]);

  return (
    <div className='error absolute bottom-5 bg-white p-3 px-4 rounded-lg shadow-sm shadow-dark opcatiy-5 flex justify-center items-center gap-3 text-dark'>
      {error}
      <div className='font-semibold' onClick={() => setError(false)}>
        <CgClose />
      </div>
    </div>
  );
}
