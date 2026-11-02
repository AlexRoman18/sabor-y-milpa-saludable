import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { Card } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nutre — Come rico, vive bien" },
      { name: "description", content: "Aprende a nutrirte con el Plato del Bien Comer, el Jarra del Buen Beber y la dieta de la milpa." },
      { property: "og:title", content: "Nutre — Come rico, vive bien" },
      { property: "og:description", content: "Guía cálida de nutrición con información oficial de México." },
    ],
  }),
  component: Index,
});

const basics = [
  { e: "🥗", t: "Completa", d: "Incluye en cada comida al menos un alimento de cada grupo del plato." },
  { e: "⚖️", t: "Equilibrada", d: "Que los nutrimentos guarden las proporciones adecuadas entre sí." },
  { e: "🧼", t: "Inocua", d: "Que no implique riesgos: alimentos limpios y bien cocinados." },
  { e: "📏", t: "Suficiente", d: "Que cubra tus necesidades según edad, sexo y actividad física." },
  { e: "🌈", t: "Variada", d: "Distintos alimentos de cada grupo en las diferentes comidas." },
  { e: "🏡", t: "Adecuada", d: "Acorde a tus gustos, cultura y recursos económicos." },
];

const tips = [
  "Come 5 veces al día: 3 comidas y 2 colaciones ligeras.",
  "Bebe de 6 a 8 vasos de agua simple al día.",
  "Prefiere frutas y verduras de temporada y producción local.",
  "Evita productos con sellos de advertencia (exceso de azúcar, sodio o grasas).",
  "Combina cereales con leguminosas: tortilla + frijol = proteína de calidad.",
  "Haz al menos 30 minutos de actividad física diaria.",
];

const sections = [
  { to: "/platos", t: "Plato del Bien Comer y Jarra del Buen Beber", c: "bg-leaf", e: "🍽️", full: false },
  { to: "/milpa", t: "La dieta de la milpa", c: "bg-corn", e: "🌽", full: false },
  { to: "/foraneos", t: "Recetas fáciles para foráneos", c: "bg-terra", e: "🎒", full: false },
  { to: "/etapas", t: "Nutrición por etapa de vida", c: "bg-sky", e: "👵", full: false },
  { to: "/imc", t: "Calcula tu IMC en segundos", c: "bg-primary", e: "⚖️", full: true },
] as const;

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-block rotate-[-2deg] rounded-full bg-corn px-4 py-1 text-sm font-extrabold text-accent-foreground">¡Hola! Vamos a comer rico 🌶️</span>
            <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] md:text-7xl">
              Comer bien <span className="text-primary">sabe</span> a casa.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Una guía amigable, basada en fuentes oficiales, para que aprendas qué comer, cuánto beber y cómo aprovechar la riqueza de la cocina mexicana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/platos" className="rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground transition hover:-translate-y-0.5">Ver el plato</Link>
              <Link to="/foraneos" className="rounded-full border-2 border-foreground px-6 py-3 font-extrabold transition hover:bg-foreground hover:text-background">Soy foráneo</Link>
            </div>
          </div>
          <div className="relative">
            <div className="blob absolute -inset-4 rotate-6 bg-terra/30" />
            <img src={hero} alt="Mesa con tortillas, frijoles, nopales, aguacate y fruta" width={1600} height={1008} className="blob relative aspect-[4/3] w-full object-cover shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-4xl font-black">Una dieta correcta es…</h2>
        <p className="mt-2 text-muted-foreground">Las 6 características según la NOM-043 y el IMSS.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {basics.map((b) => (
            <Card key={b.t} className="transition hover:-translate-y-1">
              <div className="text-4xl">{b.e}</div>
              <h3 className="mt-3 font-display text-2xl font-bold">{b.t}</h3>
              <p className="mt-1 text-muted-foreground">{b.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-4xl font-black">Pequeños hábitos, grandes cambios 💪</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {tips.map((t, i) => (
              <li key={t} className="flex gap-3 rounded-2xl bg-background/15 p-4">
                <span className="font-display text-3xl font-black text-corn">{i + 1}</span>
                <span className="font-semibold">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-4xl font-black">Explora</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((s) => (
            <Link key={s.to} to={s.to} className={`${s.c} group flex items-center justify-between rounded-3xl p-8 text-foreground transition hover:-rotate-1`}>
              <span className="font-display text-2xl font-black">{s.t}</span>
              <span className="text-5xl transition group-hover:scale-125">{s.e}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
