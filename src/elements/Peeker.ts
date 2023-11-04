import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { StoreController } from "@nanostores/lit";

import style from "@elements/Peeker.css?inline";

import { $state, hide } from "@states/peeker";

@customElement("vvv-peeker")
export class Peeker extends LitElement {
  @property()
  private stateController = new StoreController(this, $state);

  render() {
    const state = this.stateController.value;

    return html`
      <div class=${classMap({ hide: !state.show })}>
        <div class="container">
          <div class="bar">
            <h2>${state.peekAt?.title}</h2>
            <button @click=${() => hide()}>X</button>
          </div>

          ${unsafeHTML(state.peekAt?.rawData)}
        </div>
      </div>
    `;
  }

  static styles = css`
    ${unsafeCSS(style)}
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "vvv-peeker": Peeker;
  }
}
