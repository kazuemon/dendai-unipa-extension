const { build } = require('esbuild');
const glob = require('tiny-glob');

const targetFiles = async () => {
  const allFiles = await glob('./src/**/*.ts');
  const excludeFiles = await glob('./src/types/**');
  return allFiles.filter(f => !excludeFiles.includes(f));
}

(async () => {
  build({
    entryPoints: await targetFiles(),
    platform: 'browser',
    bundle: false,
    sourcemap: 'inline',
    watch: true,
    outdir: './dist',
  });
})();