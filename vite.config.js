import { resolve } from "node:path";

const resolveSrc = (k) => resolve(__dirname, "./src", k);

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      "@elements": resolveSrc("elements"),
      "@states": resolveSrc("states"),
    },
  },

  build: {
    lib: {
      entry: resolveSrc('./index.ts'),
      name: 'peeker',

      fileName: 'peeker'
    },
  }
};