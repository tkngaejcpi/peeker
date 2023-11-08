import { Peekable, tag as peekableTag } from '@elements/Peekable';
import { Peeker, tag as peekerTag } from '@elements/Peeker';

import style from './themes/default.css?inline';

/* export components */
export const components = {
  Peekable,
  Peeker,
};

/* export utils */
export const defineAllComponents = () => {
  if (!customElements.get(peekableTag)) {
    customElements.define(peekableTag, Peekable);
  }

  if (!customElements.get(peekerTag)) {
    customElements.define(peekerTag, Peeker);
  }
};

export const useDefaultTheme = () => {
  const themeStyle = document.createElement('style');
  themeStyle.innerHTML = style;

  document.getElementsByTagName('body')[0]!.appendChild(themeStyle);
};

/* show a log to remind */
console.info(
  "module 'Peeker' is loaded, you can use custom elements 'vvv-peekable' and 'vvv-peeker' now!",
);

console.info(
  'you can know more about Peeker at https://github.com/tkngaejcpi/peeker.',
);
