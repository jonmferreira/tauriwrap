import { parseArgs } from 'node:util'
import { resolve } from 'node:path'
import type { WrapOptions, Platform } from './types'
import { runDockerBuild } from './build'

const USAGE =
  'Uso: tauriwrap <url|dist/> --name <App> [--platform linux|windows] [--out <dir>] [--clean]'

const PLATFORMS: readonly Platform[] = ['linux', 'windows']

/** Plataforma-alvo padrão: a do host (Windows → windows; demais → linux). */
function defaultPlatform(): Platform {
  return process.platform === 'win32' ? 'windows' : 'linux'
}

/** Lê os argumentos do processo e os normaliza em WrapOptions. */
export function parseCliOptions(argv: readonly string[]): WrapOptions {
  const { values, positionals } = parseArgs({
    args: [...argv],
    allowPositionals: true,
    options: {
      name: { type: 'string', short: 'n' },
      out: { type: 'string', short: 'o', default: 'dist' },
      platform: { type: 'string', short: 'p' },
      clean: { type: 'boolean', default: false },
    },
  })

  const source = positionals[0]
  if (!source) throw new Error(`Fonte (URL ou pasta) obrigatória.\n${USAGE}`)
  if (!values.name) throw new Error(`--name obrigatório.\n${USAGE}`)

  const platform = (values.platform ?? defaultPlatform()) as Platform
  if (!PLATFORMS.includes(platform)) {
    throw new Error(
      `--platform inválido: "${values.platform}". Use: ${PLATFORMS.join(' | ')}.\n${USAGE}`,
    )
  }

  return {
    source,
    name: values.name,
    outDir: resolve(process.cwd(), values.out ?? 'dist'),
    clean: values.clean ?? false,
    platform,
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
