const { build } = require('esbuild');
const glob = require('tiny-glob');

(async () => {
  build({
    entryPoints: await glob('./src/!(types)/**/*.ts'),
    platform: 'browser',
    bundle: false,
    sourcemap: 'inline',
    outdir: './dist',
  });
})();