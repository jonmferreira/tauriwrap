import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli/index.ts'],
  format: ['esm'],
  target: 'node18',
  clean: true,
  // CLI publicável no npm precisa do shebang no bin gerado.
  banner: { js: '#!/usr/bin/env node' },
})
