import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { getContent, t } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TEM MAIS AQUI | AAPVR", template: "%s | TEM MAIS AQUI" },
  description: "Encontre serviços, unidades e formas de participar da AAPVR.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const c = await getContent();
  const nav = [
    ["nav.inicio", "/"], ["nav.explorar", "/explorar"],
    ["nav.servicos", "/servicos"], ["nav.como", "/como-funciona"],
    ["nav.unidades", "/unidades"], ["nav.duvidas", "/duvidas"],
    ["nav.associado", "/associado"], ["nav.associacao", "/associacao"],
  ];
  return (
    <html lang="pt-BR">
      <body>
        <div className="top-strip">AAPVR <span>•</span> TEM MAIS AQUI</div>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="AAPVR, início"><span className="brand-mark">A</span><span>AAPVR<small>TEM MAIS AQUI</small></span></Link>
            <nav className="desktop-nav" aria-label="Navegação principal">
              {nav.map(([key, href]) => <Link key={href} href={href} className={href==="/associacao" ? "nav-cta" : ""}>{t(c,key)}</Link>)}
            </nav>
            <details className="mobile-nav"><summary aria-label="Abrir menu">☰ Menu</summary><nav>{nav.map(([key,href]) => <Link key={href} href={href}>{t(c,key)}</Link>)}</nav></details>
          </div>
        </header>
        {!c.cmsOnline && <div className="demo-banner" role="status"><div className="container">Versão de demonstração. Informações operacionais e contatos precisam de confirmação antes da publicação.</div></div>}
        <main id="principal">{children}</main>
        <footer className="site-footer"><div className="container footer-inner"><div><strong>AAPVR · TEM MAIS AQUI</strong><p>{t(c,"rodape.aviso")}</p></div><Link href="/contato">Encontrar o setor certo ↗</Link></div></footer>
        <Link href="/explorar" className="mobile-cta">Encontrar um serviço <span>→</span></Link>
      </body>
    </html>
  );
}
