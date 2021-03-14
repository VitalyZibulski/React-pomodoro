import React, { useState, useRef } from 'react';
import './App.css';
import { padTime } from "./utils/utils";

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin');
  const [timeLeft, setTimeleft] = useState(25 * 60);
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle(`You're doing great`);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
        setTimeleft(timeLeft => {
            if (timeLeft >= 1) {
              return timeLeft -1;
            }

            resetTimer();
            return 0;
        });
      }, 1000);
  }

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Keep it up');
    setIsRunning(false);
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Ready to go another round?');
    setTimeleft(25 * 60);
    setIsRunning(false);
  }

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
