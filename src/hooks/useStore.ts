import React from 'react';
import { RootStore } from '../store/root';

export const useStore = () => React.useContext(RootStore);