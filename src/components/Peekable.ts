import style from '@components/Peekable.css?inline';
import { Component, ComponentPair } from '@rileycki3333/component-box';

import { css, html, unsafeCSS } from 'lit';

import { property } from 'lit/decorators.js';

import { WindowPosition, peek } from '@states/peeker';

/* --- helpers --- */
const mkPosition = (e: MouseEvent): WindowPosition => ({
  x: e.clientX,
  y: e.clientY,
});

/* --- component stuff --- */
export const tag = 'vvv-peekable' as const;

export class Peekable extends Component {
  @property({ attribute: 'data-url' })
  public dataURL: string | undefined = undefined;

  render() {
    return html`
      <a @click=${(e: MouseEvent) => {
        peek(this.dataURL!, mkPosition(e));
      }}><slot><slot/></a>
      `;
  }

  static styles = css`
    ${unsafeCSS(style)}
  `;
}

export const pair: ComponentPair = {
  tag,
  constructor: Peekable,
};

declare global {
  interface HTMLElementTagNameMap {
    [tag]: Peekable;
  }
}
