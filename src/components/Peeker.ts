import { ComponentPair, StateComponent } from '@rileycki3333/component-box';

import { css, html, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { $state, PeekerState, hide } from '@states/peeker';

import style from '@components/Peeker.css?inline';

/* --- component stuff --- */
export const tag = 'vvv-peeker' as const;

export class Peeker extends StateComponent<PeekerState> {
  constructor() {
    super($state);
  }

  render() {
    const state = this.getState();

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

export const pair: ComponentPair = {
  tag,
  constructor: Peeker,
};

declare global {
  interface HTMLElementTagNameMap {
    [tag]: Peeker;
  }
}
