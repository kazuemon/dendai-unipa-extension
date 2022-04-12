const { build } = require('esbuild');
const glob = require('tiny-glob');

(async () => {
  build({
    entryPoints: await glob('./src/**/*.ts'),
    platform: 'browser',
    bundle: false,
    sourcemap: true,
    watch: true,
    outdir: './dist',
  });
})();