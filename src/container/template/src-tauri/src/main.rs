// Evita abrir um console extra no Windows em release, NÃO REMOVER!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauriwrap_app_lib::run()
}
