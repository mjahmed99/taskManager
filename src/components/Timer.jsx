// src/components/Timer.jsx
import React from 'react';
import usePomodoroTimer from '../hooks/usePomodoroTimer'; 

const Timer = () => {
  const { timeLeft, isRunning, start, pause, reset } = usePomodoroTimer(1500);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h3>Pomodoro Timer</h3>
      <p>{formatTime(timeLeft)}</p>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Timer;
