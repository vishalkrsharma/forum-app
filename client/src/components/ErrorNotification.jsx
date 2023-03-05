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
    <div className='error absolute bottom-5 bg-white p-3 px-4 rounded-lg shadow-sm shadow-dark opcatiy-5 text-dark left-1/2 -translate-x-1/2'>
      <div className='flex justify-center items-center gap-3'>
        {error}
        <div className='font-semibold rounded-lg hover:bg-diffused p-2' onClick={() => setError(false)}>
          <CgClose />
        </div>
      </div>
    </div>
  );
}
