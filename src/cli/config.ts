import type { WrapOptions } from './types'

/**
 * Estrutura do `tauri.conf.json` (Tauri v2).
 *
 * @pendente-verificacao — o schema do Tauri v2 (que mudou bastante em relação
 * ao v1) será validado contra a doc oficial antes de preencher os campos
 * definitivos. Ver https://tauri.app/reference/config/
 */
export type TauriConfig = Record<string, unknown>

/**
 * Mapeia {@link WrapOptions} → `tauri.conf.json` mínimo para o build Linux.
 *
 * Por enquanto preenche apenas o que é inequívoco (`productName`). Os campos de
 * janela, URL de origem e bundle identifier entram após a verificação do
 * schema v2 — não são inventados aqui para não afirmar algo não verificado.
 */
export function buildTauriConfig(options: WrapOptions): TauriConfig {
  return {
    productName: options.name,
    // TODO(tauri-v2): app.windows[].url a partir de options.source,
    // identifier, bundle.targets=['deb'] — após validar o schema v2.
  }
}
