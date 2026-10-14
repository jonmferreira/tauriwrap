import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir, readdir } from 'node:fs/promises'
import type { WrapOptions, BuildResult } from './types'
import { buildTauriConfig } from './config'

const BUILDER_IMAGE = 'tauriwrap-builder:local'

/** `src/container` é publicado ao lado de `dist/` dentro do pacote npm. */
const CONTAINER_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/container',
)

/** Executa um comando herdando o stdio; rejeita se o exit code não for 0. */
function run(command: string, args: readonly string[]): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, [...args], { stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolvePromise()
      } else {
        reject(new Error(`${command} saiu com código ${code ?? 'null'}`))
      }
    })
  })
}

/** Constrói a imagem do builder localmente (build on-the-fly, cacheado pelo Docker). */
function ensureBuilderImage(): Promise<void> {
  return run('docker', ['build', '-t', BUILDER_IMAGE, CONTAINER_DIR])
}

/**
 * Empacota a fonte em um artefato desktop via container Tauri.
 *
 * Contrato com o container (`src/container/build.sh`, próximo passo):
 * - recebe a config Tauri serializada na env `TAURIWRAP_CONFIG`;
 * - escreve o artefato final no volume montado em `/out`.
 */
export async function runDockerBuild(options: WrapOptions): Promise<BuildResult> {
  await mkdir(options.outDir, { recursive: true })
  await ensureBuilderImage()

  const config = buildTauriConfig(options)

  await run('docker', [
    'run', '--rm',
    '-e', `TAURIWRAP_CONFIG=${JSON.stringify(config)}`,
    '-e', `TAURIWRAP_SOURCE=${options.source}`,
    '-v', `${options.outDir}:/out`,
    BUILDER_IMAGE,
  ])

  const deb = (await readdir(options.outDir)).find((f) => f.endsWith('.deb'))
  if (!deb) throw new Error('Build terminou sem gerar um .deb em outDir.')

  return { artifactPath: join(options.outDir, deb) }
}
