import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // every time "isRunning" changes
  useEffect(() => {
    let timer;
    // if timer is running -> increase "currentTime" by 10ms every 10ms
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  function start() {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  function stop() {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  function reset() {
    setIsRunning(false);
    setCurrentTime(0);
  };

  function formatTime(time) {
    let hours = Math.floor(time / 1000 / 60 / 60);
    let minutes = Math.floor((time / 1000 / 60) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let milliseconds = Math.floor((time / 10) % 100);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <div id="container">
        <div id="display">{formatTime(currentTime)}</div>
        <div id="btn-container">
          <button onClick={start}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button onClick={stop}>
            <FontAwesomeIcon icon={faPause} />
          </button>
          <button onClick={reset}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
      </div>
    </>
  );
}