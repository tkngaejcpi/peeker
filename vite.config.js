import { resolve } from 'node:path';

const resolveSrc = (k) => resolve(__dirname, './src', k);

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      '@components': resolveSrc('./components'),
      '@states': resolveSrc('./states'),
    },
  },

  define: { 'process.env.NODE_ENV': '"production"' },

  build: {
    target: ['edge88', 'firefox78', 'chrome87', 'safari14'],

    lib: {
      entry: resolveSrc('./index.ts'),
      name: 'peeker',
      formats: ['es'],

      fileName: 'index',
    },
  },
};
