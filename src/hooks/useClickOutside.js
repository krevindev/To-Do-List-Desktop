import { useEffect, useRef, useState } from 'react';

function useClickOutside(targetRef) {

  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    const handleClickOutside = e => {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        setIsClickedOutside(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return isClickedOutside;
}

export default useClickOutside;
