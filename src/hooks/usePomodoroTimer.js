// src/hooks/usePomodoroTimer.js
import { useReducer, useRef, useCallback } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'START': return { ...state, isRunning: true };
    case 'PAUSE': return { ...state, isRunning: false };
    case 'RESET': return { timeLeft: action.payload, isRunning: false };
    case 'TICK': return { ...state, timeLeft: state.timeLeft - 1 };
    default: return state;
  }
};

const usePomodoroTimer = (initialTime = 1500) => {
  const [state, dispatch] = useReducer(reducer, {
    timeLeft: initialTime,
    isRunning: false,
  });

  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (!intervalRef.current) {
      dispatch({ type: 'START' });
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }
  }, []);

  const pause = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    dispatch({ type: 'PAUSE' });
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    dispatch({ type: 'RESET', payload: initialTime });
  }, [initialTime]);

  return { ...state, start, pause, reset };
};

export default usePomodoroTimer;
