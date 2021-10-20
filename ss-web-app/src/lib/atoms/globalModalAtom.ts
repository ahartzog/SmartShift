import React from 'react';
import { atom } from 'recoil';

const globalModalState = atom({
  key: 'globalModalState', // unique ID (with respect to other atoms/selectors)
  default: {
    isVisible: false,
  },
});

export { globalModalState };
