import type { WrapOptions } from './types'

/** Subconjunto do `tauri.conf.json` (Tauri v2) que o TauriWrap gera. */
export type TauriConfig = Record<string, unknown>

/** Deriva um slug válido para o identifier reverse-domain a partir do nome. */
function toIdentifierSlug(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  return slug.length > 0 ? slug : 'app'
}

/**
 * Mapeia {@link WrapOptions} → `tauri.conf.json` (Tauri v2) para empacotar uma
 * URL remota como app desktop.
 *
 * O mecanismo do "wrap": `build.frontendDist` recebe a URL remota — assim o app
 * carrega a URL diretamente, sem assets locais empacotados.
 * Ref: https://v2.tauri.app/reference/config/
 */
export function buildTauriConfig(options: WrapOptions): TauriConfig {
  return {
    productName: options.name,
    version: '0.1.0',
    identifier: `com.tauriwrap.${toIdentifierSlug(options.name)}`,
    build: {
      frontendDist: options.source,
    },
    app: {
      windows: [
        {
          label: 'main',
          title: options.name,
          width: 1200,
          height: 800,
          resizable: true,
        },
      ],
    },
    bundle: {
      active: true,
      targets: ['deb'],
      icon: [
        'icons/32x32.png',
        'icons/128x128.png',
        'icons/128x128@2x.png',
        'icons/icon.icns',
        'icons/icon.ico',
      ],
    },
  }
}
