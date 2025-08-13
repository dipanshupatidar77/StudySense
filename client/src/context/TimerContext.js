// src/context/TimerContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const startTimer = (minutes) => {
    setSecondsLeft(minutes * 60);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (secondsLeft > 0) setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(0);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      Swal.fire("⏰ Time's up!", "Great job, take a break!", "success");
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        secondsLeft,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
