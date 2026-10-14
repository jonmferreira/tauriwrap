// A janela principal e a URL de origem vêm do tauri.conf.json (gerado pelo CLI).
// Builder mínimo: apenas exibe a webview na URL configurada em build.frontendDist.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
