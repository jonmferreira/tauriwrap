// Rotina de limpeza do TauriWrap — foco em liberar disco/memória.
//
// Uso:
//   node scripts/clean.mjs          → artefatos locais (dist/, .poc-out/)
//   node scripts/clean.mjs --deep   → + imagem Docker do builder e imagens
//                                      dangling (lixo de build), e mostra o
//                                      uso de disco do Docker ao final.
//
// O container de build roda com `--rm`, então seus temporários (incl. o
// `target/` do cargo) são descartados a cada execução. Aqui limpamos o que
// fica no host: artefatos, a imagem pesada do builder e camadas órfãs.
import { rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const LOCAL_DIRS = ['dist', '.poc-out']
const BUILDER_IMAGE = 'tauriwrap-builder:local'

/** Executa um comando docker best-effort (não falha a limpeza se der erro). */
function docker(args, okLabel) {
  try {
    execFileSync('docker', args, { stdio: 'inherit' })
    if (okLabel) console.log(`✓ ${okLabel}`)
  } catch {
    console.warn(`⚠ ignorado: docker ${args.join(' ')}`)
  }
}

// 1. Artefatos locais (sempre).
for (const dir of LOCAL_DIRS) {
  rmSync(dir, { recursive: true, force: true })
  console.log(`✓ removido: ${dir}/`)
}

// 2. Docker (--deep): libera os GB da imagem do builder + camadas órfãs.
if (process.argv.includes('--deep')) {
  docker(['rmi', '-f', BUILDER_IMAGE], `imagem removida: ${BUILDER_IMAGE}`)
  docker(['image', 'prune', '-f'], 'imagens dangling removidas')
  console.log('\nUso de disco do Docker após a limpeza:')
  docker(['system', 'df'], null)
}

// Nota: o cache de build global (`docker builder prune`) afeta TODOS os
// projetos Docker da máquina e NÃO é removido aqui de propósito. Rode
// manualmente se precisar liberar ainda mais espaço.
