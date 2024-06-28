import { useEffect, useRef } from 'react';

const useInactivityTimer = (logoutCallback, timeout = 1800000) => { // 30 minutes
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(logoutCallback, timeout);
  };

  const handleActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    resetTimer(); // Initialize the timer

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, []);

  return null;
};

export default useInactivityTimer;
