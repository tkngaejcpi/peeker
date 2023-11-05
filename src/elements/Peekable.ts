import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import style from "@elements/Peekable.css?inline";

import { WindowPosition, peek } from "@states/peeker";

/* --- helpers --- */
const mkPosition = (e: MouseEvent): WindowPosition => ({
  x: e.clientX,
  y: e.clientY,
});

/* --- component --- */
@customElement("vvv-peekable")
export class Peekable extends LitElement {
  @property({ attribute: "data-url" })
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
    "vvv-peekable": Peekable;
  }
}
