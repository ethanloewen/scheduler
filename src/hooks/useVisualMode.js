import React, { useState } from 'react';

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newMode) => {
    setMode(newMode);

    const tempHistory = history;
    tempHistory.push(newMode);
    setHistory(tempHistory);
  };

  const back = () => {
    const tempHistory = history;
    tempHistory.pop();
    setHistory(tempHistory);
    
    const lastElm = history.length - 1;
    setMode(history[lastElm]);
  };

  return { 
    mode,
    transition,
    back
  };
}