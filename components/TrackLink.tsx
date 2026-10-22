"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
export default function TrackLink({ href, event, params = {}, children, className = "" }: {
  href: string; event: string; params?: Record<string,string>;
  children: ReactNode; className?: string;
}) {
  return <Link href={href} className={className} onClick={() => track(event, params)}>{children}</Link>;
}
