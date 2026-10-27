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
    ["Unidades", "/#unidades"], ["Como acessar", "/como-funciona"],
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
            <Link className="header-member-link" href="/associado">Sou associado <span aria-hidden="true">→</span></Link>
            <details className="mobile-nav"><summary aria-label="Abrir menu">☰ Menu</summary><nav>{nav.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</nav></details>
          </div>
        </header>
        <main id="principal">{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-brand-lockup">
              <Image className="footer-aapvr-logo" src="/brand/aapvr.svg" alt="AAPVR — Associação dos Aposentados e Pensionistas de Volta Redonda" width={142} height={56} />
              <Image className="brand-campaign-logo" src="/brand/tem-mais-aqui.svg" alt="Tem Mais Aqui" width={150} height={76} />
            </div>
            <p className="footer-notice">{t(c,"rodape.aviso")}</p>
            <div className="footer-social"><strong>Acompanhe a AAPVR:</strong><div className="footer-social-links">{([
              ["Instagram", t(c,"social.instagram.url")],
              ["Facebook", t(c,"social.facebook.url")],
              ["Canal no WhatsApp", t(c,"social.whatsapp.url")],
            ] as [string,string][]).map(([label,url]) => /^https?:\/\//i.test(url)
              ? <a href={url} key={label} target="_blank" rel="noopener noreferrer">{label}</a>
              : <span key={label} className="footer-social-unavailable">{label}</span>)}</div></div>
          </div>
          <div className="container footer-bottom"><span>Associação dos Aposentados e Pensionistas de Volta Redonda</span><Link href="/">Voltar ao início ↑</Link></div>
        </footer>
      </body>
    </html>
  );
}
