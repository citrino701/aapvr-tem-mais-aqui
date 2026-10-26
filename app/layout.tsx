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
    ["Serviços", "/servicos"], ["Quem pode utilizar", "/#quem-pode-utilizar"],
    ["Unidades", "/#unidades"], ["Como acessar", "/#como-acessar"],
    ["Dúvidas", "/#duvidas"],
  ];
  return (
    <html lang="pt-BR">
      <body>
        <NavigationFeedback />
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="AAPVR, início">
              <Image className="brand-aapvr-logo" src="/brand/aapvr.svg" alt="AAPVR — Associação dos Aposentados e Pensionistas de Volta Redonda" width={136} height={54} priority />
            </Link>
            <nav className="desktop-nav" aria-label="Navegação principal">
              {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
            <details className="mobile-nav"><summary aria-label="Abrir menu">☰ Menu</summary><nav>{nav.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</nav></details>
          </div>
        </header>
        {!c.cmsOnline && <div className="demo-banner" role="status"><div className="container">Versão de demonstração. Informações operacionais e contatos precisam de confirmação antes da publicação.</div></div>}
        <main id="principal">{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-brand-lockup">
              <Image className="footer-aapvr-logo" src="/brand/aapvr.svg" alt="AAPVR — Associação dos Aposentados e Pensionistas de Volta Redonda" width={142} height={56} />
              <Image className="brand-campaign-logo" src="/brand/tem-mais-aqui.svg" alt="Tem Mais Aqui" width={150} height={76} />
            </div>
            <p>{t(c,"rodape.aviso")}</p>
            <Link className="footer-cta" href="/contato">Encontrar o setor certo <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="container footer-bottom"><span>Associação dos Aposentados e Pensionistas de Volta Redonda</span><Link href="/">Voltar ao início ↑</Link></div>
        </footer>
      </body>
    </html>
  );
}
