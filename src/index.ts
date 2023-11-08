import { injectTheme, registerComponents } from '@rileycki3333/component-box';

import { pair as peekablePair } from '@components/Peekable';
import { pair as peekerPair } from '@components/Peeker';

import defaultTheme from './themes/default.css?inline';

/* export components */
export const componentPairs = [peekablePair, peekerPair];

/* export utils */
export const defineAllComponents = () => {
  registerComponents(componentPairs);
};

export const useDefaultTheme = () => {
  injectTheme(peekerPair, defaultTheme);
};

export const ootb = () => {
  defineAllComponents();
  useDefaultTheme();
};
