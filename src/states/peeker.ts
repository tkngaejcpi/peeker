import { map, action } from 'nanostores';

/* --- state --- */
export interface WindowPosition {
  x: number;
  y: number;
}

export interface PeekData {
  title: string;
  linkTo: string;
  rawData: string;
}

interface PeekerState {
  show: boolean;
  position: WindowPosition;

  peekAt?: PeekData;
}

const initState: PeekerState = {
  show: false,
  position: {
    x: 0,
    y: 0,
  },
};

export const $state = map(initState);

/* --- actions --- */
export const hide = action($state, 'hide', ($s) => {
  $s.setKey('show', false);
});

export const show = action($state, 'show', ($s) => {
  $s.setKey('show', true);
});

export const peek = action(
  $state,
  'peek',
  ($s, url: string, position: WindowPosition) => {
    fetch(url)
      .then((res) => res.json() as Promise<PeekData>)
      .then((data) => {
        $s.setKey('peekAt', data);
        $s.setKey('position', position);
        show();
      });
  },
);
