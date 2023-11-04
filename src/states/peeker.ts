import { map, action } from "nanostores";

/* --- state --- */
export interface PeekData {
  title: string;
  linkTo: string;
  rawData: string;
}

interface PeekerState {
  show: boolean;

  peekAt?: PeekData;
}

const initState: PeekerState = {
  show: false,
};

export const $state = map(initState);

/* --- actions --- */
export const hide = action($state, "hide", ($s) => {
  $s.setKey("show", false);
});

export const show = action($state, "show", ($s) => {
  $s.setKey("show", true);
});

export const peek = action($state, "peek", ($s, url: string) => {
  fetch(url)
    .then((res) => res.json() as Promise<PeekData>)
    .then((data) => {
      $s.setKey("peekAt", data);
      show();
    });
});
