"use client";

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function ClarityProvider() {
  useEffect(() => {
    Clarity.init('r4eyn1yqn0'); 
  }, []);

  return null;
}
