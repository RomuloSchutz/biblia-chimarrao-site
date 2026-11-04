import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Preserve the HTML whitespace behavior used before Astro 7.
  compressHTML: true
});
