import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import process from 'node:process';

esbuild.build({
  entryPoints: {
    letterboxd: './src/js/letterboxd.ts',
    popup: './src/popup.tsx',
  },
  bundle: true,
  outdir: 'dist',
  minify: true,
  sourcemap: true,
  metafile: true,
  target: ['es2020'],
  plugins: [
    copy({ assets: { from: ['./src/manifest.json'], to: ['./'] } }),
    copy({ assets: { from: ['./src/css/*'], to: ['./css'] } }),
    copy({ assets: { from: ['./src/img/*'], to: ['./img'] } }),
    htmlPlugin({ files: [{ entryPoints: ['popup'], filename: 'popup.html', htmlTemplate: './src/popup.html' }] }),
  ],
}).catch(() => process.exit(1));