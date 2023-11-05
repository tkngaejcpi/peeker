import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { StoreController } from "@nanostores/lit";

import style from "@elements/Peeker.css?inline";

import { $state, hide } from "@states/peeker";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("vvv-peeker")
export class Peeker extends LitElement {
  @property()
  private stateController = new StoreController(this, $state);

  render() {
    const state = this.stateController.value;

    return html`
      <div
        class=${classMap({ container: true, hidden: !state.show })}
        style=${styleMap({
          top: `${state.position.y}px`,
          left: `${state.position.x}px`,
        })}
      >
        <div class="bar">
          <h2>
            <a href=${state.peekAt?.linkTo}>${state.peekAt?.title}</a>
          </h2>
          <button
            @click=${() => {
              hide();
            }}
          >
            X
          </button>
        </div>

        ${unsafeHTML(state.peekAt?.rawData)}
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
