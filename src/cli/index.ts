import { parseArgs } from 'node:util'
import { resolve } from 'node:path'
import type { WrapOptions } from './types'
import { runDockerBuild } from './build'

const USAGE = 'Uso: tauriwrap <url|dist/> --name <App> [--out <dir>]'

/** Lê os argumentos do processo e os normaliza em WrapOptions. */
export function parseCliOptions(argv: readonly string[]): WrapOptions {
  const { values, positionals } = parseArgs({
    args: [...argv],
    allowPositionals: true,
    options: {
      name: { type: 'string', short: 'n' },
      out: { type: 'string', short: 'o', default: 'dist' },
    },
  })

  const source = positionals[0]
  if (!source) throw new Error(`Fonte (URL ou pasta) obrigatória.\n${USAGE}`)
  if (!values.name) throw new Error(`--name obrigatório.\n${USAGE}`)

  return {
    source,
    name: values.name,
    outDir: resolve(process.cwd(), values.out ?? 'dist'),
  }
}

async function main(): Promise<void> {
  const options = parseCliOptions(process.argv.slice(2))
  const { artifactPath } = await runDockerBuild(options)
  console.log(`✓ Artefato gerado: ${artifactPath}`)
}

main().catch((err: unknown) => {
  console.error(`✗ ${err instanceof Error ? err.message : String(err)}`)
  process.exitCode = 1
})
