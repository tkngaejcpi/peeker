import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import style from "@elements/Peekable.css?inline";

import { peek } from "@states/peeker";

@customElement("vvv-peekable")
export class Peekable extends LitElement {
  @property({ attribute: "data-url" })
  public dataURL: string | undefined = undefined;

  render() {
    return html`
      <a @click=${() => peek(this.dataURL!)}><slot><slot/></a>
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
