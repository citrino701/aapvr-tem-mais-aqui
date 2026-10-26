import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { t } from "@/lib/data";
import { getContent } from "@/lib/cms";
import NavigationFeedback from "@/components/NavigationFeedback";
import "./globals.css";
import "./campaign.css";

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
        <NavigationFeedback />
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="AAPVR, início">
              <span className="brand-aapvr">AAPVR<small>ASSOCIAÇÃO</small></span>
              <span className="brand-divider" aria-hidden="true" />
              <Image className="brand-campaign-logo" src="/brand/tem-mais-aqui.svg" alt="Tem Mais Aqui" width={154} height={78} priority />
            </Link>
            <nav className="desktop-nav" aria-label="Navegação principal">
              {nav.map(([key, href]) => <Link key={href} href={href} className={href==="/associacao" ? "nav-cta" : ""}>{t(c,key)}</Link>)}
            </nav>
            <details className="mobile-nav"><summary aria-label="Abrir menu">☰ Menu</summary><nav>{nav.map(([key,href]) => <Link key={href} href={href}>{t(c,key)}</Link>)}</nav></details>
          </div>
        </header>
        {!c.cmsOnline && <div className="demo-banner" role="status"><div className="container">Versão de demonstração. Informações operacionais e contatos precisam de confirmação antes da publicação.</div></div>}
        <main id="principal">{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-brand-lockup">
              <span className="footer-aapvr">AAPVR<small>ASSOCIAÇÃO</small></span>
              <Image src="/brand/tem-mais-aqui.svg" alt="Tem Mais Aqui" width={150} height={76} />
            </div>
            <p>{t(c,"rodape.aviso")}</p>
            <Link className="footer-cta" href="/contato">Encontrar o setor certo <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="container footer-bottom"><span>Associação dos Aposentados e Pensionistas de Volta Redonda</span><Link href="/">Voltar ao início ↑</Link></div>
        </footer>
        <Link href="/explorar" className="mobile-cta">Encontrar um serviço <span>→</span></Link>
      </body>
    </html>
  );
}
