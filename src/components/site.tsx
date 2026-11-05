import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/platos", label: "Platos oficiales" },
  { to: "/milpa", label: "Dieta de la milpa" },
  { to: "/foraneos", label: "Estudiantes foráneos" },
  { to: "/etapas", label: "Por etapa de vida" },
  { to: "/imc", label: "Calcula tu IMC" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2 font-display text-2xl font-black text-primary">
          <span className="blob inline-block h-8 w-8 shrink-0 bg-corn" /> Nutre
        </Link>
        <nav className="hidden flex-wrap gap-1 text-sm font-bold md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-border transition hover:bg-muted md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          <ul className="grid gap-1 text-base font-bold">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: true }}
                  className="block rounded-2xl px-4 py-3 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
        <div>
          <p className="font-display text-3xl font-black text-corn">Nutre</p>
          <p className="mt-2 max-w-sm text-sm opacity-80">
            Información educativa. No sustituye la consulta con un profesional de la salud o nutrición.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold text-corn">Fuentes</p>
          <ul className="space-y-1 opacity-80">
            <li><a className="underline" href="https://www.gob.mx/salud/acciones-y-programas/la-dieta-de-la-milpa-298617" target="_blank" rel="noreferrer">Secretaría de Salud — La dieta de la milpa</a></li>
            <li><a className="underline" href="https://www.imss.gob.mx/salud-en-linea/nutricion" target="_blank" rel="noreferrer">IMSS — Salud en línea: Nutrición</a></li>
            <li><a className="underline" href="https://www.clinicbarcelona.org/asistencia/vida-saludable/cuidando-al-cuidador/la-nutricion-y-las-personas-mayores" target="_blank" rel="noreferrer">Clínic Barcelona — Nutrición y personas mayores</a></li>
            <li><a className="underline" href="https://www.stanfordchildrens.org/es/topic/default?id=healthy-eating-for-teens-90-P04711" target="_blank" rel="noreferrer">Stanford Children's — Alimentación para adolescentes</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children, tone = "bg-cream" }: { eyebrow: string; title: string; children?: ReactNode; tone?: string }) {
  return (
    <section className={`${tone} relative overflow-hidden`}>
      <div className="blob absolute -right-16 -top-16 h-64 w-64 bg-corn/40" />
      <div className="blob absolute -bottom-20 left-10 h-48 w-48 bg-leaf/25" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="text-sm font-extrabold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-border bg-card p-6 shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--primary)_25%,transparent)] ${className}`}>{children}</div>;
}
