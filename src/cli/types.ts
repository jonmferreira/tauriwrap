/** Opções normalizadas para empacotar uma URL/webapp como app desktop. */
export interface WrapOptions {
  /** URL (https://...) ou caminho de uma pasta `dist/` a empacotar. */
  readonly source: string
  /** Nome do app — usado no binário e no pacote `.deb`. */
  readonly name: string
  /** Diretório absoluto onde o artefato final é escrito. */
  readonly outDir: string
  /** Se true, remove a imagem Docker do builder após o build (libera espaço). */
  readonly clean: boolean
}

/** Resultado de um build concluído. */
export interface BuildResult {
  /** Caminho absoluto do artefato gerado (`.deb` no PoC Linux). */
  readonly artifactPath: string
}
