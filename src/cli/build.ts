import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { existsSync } from 'node:fs'
import { mkdir, readdir } from 'node:fs/promises'
import type { WrapOptions, BuildResult } from './types'
import { buildTauriConfig } from './config'

const BUILDER_IMAGE = 'tauriwrap-builder:local'

/**
 * Localiza `src/container` subindo a partir do módulo atual. Resolve os dois
 * layouts: `dist/index.js` (bundle publicado) e `src/cli/index.ts` (dev/tsx),
 * que ficam a profundidades diferentes do raiz do pacote.
 */
function resolveContainerDir(): string {
  let dir = dirname(fileURLToPath(import.meta.url))
  for (let i = 0; i < 5; i++) {
    const candidate = resolve(dir, 'src/container')
    if (existsSync(candidate)) return candidate
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  throw new Error('src/container não encontrado — pacote TauriWrap incompleto.')
}

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
  return run('docker', ['build', '-t', BUILDER_IMAGE, resolveContainerDir()])
}

/**
 * Remove a imagem do builder (cleanup opcional via `--clean`). Best-effort: um
 * build já concluído não deve falhar porque a limpeza de espaço não deu certo.
 */
async function removeBuilderImage(): Promise<void> {
  try {
    await run('docker', ['rmi', BUILDER_IMAGE])
  } catch {
    console.warn('⚠ Não foi possível remover a imagem do builder (ignorado).')
  }
}

/**
 * Empacota a fonte em um artefato desktop via container Tauri.
 *
 * Contrato com o container (`src/container/build.sh`):
 * - recebe a config Tauri serializada na env `TAURIWRAP_CONFIG`
 *   (com `build.frontendDist` = URL remota);
 * - escreve o `.deb` no volume montado em `/out`.
 *
 * O container roda com `--rm`, então seu filesystem temporário é descartado a
 * cada build. Com `--clean`, também remove a imagem do builder ao final.
 */
export async function runDockerBuild(options: WrapOptions): Promise<BuildResult> {
  await mkdir(options.outDir, { recursive: true })
  await ensureBuilderImage()

  const config = buildTauriConfig(options)

  await run('docker', [
    'run', '--rm',
    '-e', `TAURIWRAP_CONFIG=${JSON.stringify(config)}`,
    '-v', `${options.outDir}:/out`,
    BUILDER_IMAGE,
  ])

  const deb = (await readdir(options.outDir)).find((f) => f.endsWith('.deb'))
  if (!deb) throw new Error('Build terminou sem gerar um .deb em outDir.')

  if (options.clean) await removeBuilderImage()

  return { artifactPath: join(options.outDir, deb) }
}
