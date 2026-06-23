import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';

/**
 * Discover per-component entries at config time so adding a new
 * component requires no Vite-config edits — drop a file in
 * `src/components/<name>/index.ts` and a sibling
 * `src/define/<name>.ts`, and it ships as its own ESM chunk.
 */
function collectEntries(): Record<string, string> {
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
    'define/all': resolve(__dirname, 'src/define/all.ts'),
  };

  const componentsDir = resolve(__dirname, 'src/components');
  for (const name of readdirSync(componentsDir, { withFileTypes: true })) {
    if (!name.isDirectory()) continue;
    entries[`components/${name.name}`] = resolve(componentsDir, name.name, 'index.ts');
  }

  const defineDir = resolve(__dirname, 'src/define');
  for (const file of readdirSync(defineDir)) {
    if (!file.endsWith('.ts') || file === 'all.ts') continue;
    const stem = file.replace(/\.ts$/, '');
    entries[`define/${stem}`] = resolve(defineDir, file);
  }

  return entries;
}

export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: collectEntries(),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lit', /^lit\//],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith('.css')) return 'styles.css';
          return 'assets/[name]-[hash][extname]';
        },
      },
      preserveEntrySignatures: 'strict',
    },
    minify: false,
  },
});
