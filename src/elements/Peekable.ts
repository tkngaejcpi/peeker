import { LitElement, css, html, unsafeCSS } from 'lit';

import { property } from 'lit/decorators.js';

import { WindowPosition, peek } from '@states/peeker';

import style from '@elements/Peekable.css?inline';

/* --- helpers --- */
const mkPosition = (e: MouseEvent): WindowPosition => ({
  x: e.clientX,
  y: e.clientY,
});

/* --- component --- */
export const tag = 'vvv-peekable';

export class Peekable extends LitElement {
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

declare global {
  interface HTMLElementTagNameMap {
    [tag]: Peekable;
  }
}
