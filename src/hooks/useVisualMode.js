import React, { useState } from 'react';

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);

  return { mode };
}