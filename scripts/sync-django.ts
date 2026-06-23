#!/usr/bin/env bun
/**
 * Copy the built `dist/` directory into the django-twip package's
 * static asset directory.
 *
 * Run after `bun run build` whenever you cut a new release of the JS
 * package and want the Python wheel to ship the freshest bundle.
 */
import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const repoRoot = resolve(import.meta.dir, '..');
const distDir = resolve(repoRoot, 'dist');
const targetDir = resolve(repoRoot, 'packages/django-twip/twip/static/twip');

if (!existsSync(distDir)) {
  console.error('dist/ not found. Run `bun run build` first.');
  process.exit(1);
}

rmSync(targetDir, { recursive: true, force: true });
cpSync(distDir, targetDir, { recursive: true });
console.log(`Synced ${distDir} -> ${targetDir}`);
