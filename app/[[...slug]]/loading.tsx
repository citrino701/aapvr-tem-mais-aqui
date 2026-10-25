export default function Loading() {
  return <main className="container page-space page-loading" role="status" aria-live="polite">
    <span className="loading-mark" aria-hidden="true">+</span>
    <p>Carregando o próximo caminho…</p>
  </main>;
}
