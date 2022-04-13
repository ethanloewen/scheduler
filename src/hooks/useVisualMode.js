import { useState } from 'react';

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if(replace) {
      let tempHistory = [...history];
      tempHistory[tempHistory.length -1] = newMode;
      setHistory(tempHistory);
      return;
    }
    
    let tempHistory = [...history, newMode];
    setHistory(tempHistory);
  };

  const back = () => {
    let tempHistory = [...history];
    tempHistory.pop();
    setHistory(tempHistory);
  
    if(history.length > 1) {
      setMode(tempHistory[tempHistory.length-1]);
    }
  };

  return { 
    mode,
    transition,
    back
  };
}