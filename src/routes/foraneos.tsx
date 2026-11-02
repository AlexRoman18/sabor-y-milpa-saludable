import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero } from "@/components/site";

export const Route = createFileRoute("/foraneos")({
  head: () => ({
    meta: [
      { title: "Recetas fáciles para estudiantes foráneos — Nutre" },
      { name: "description", content: "Platillos rápidos, baratos y nutritivos para estudiantes que viven lejos de casa." },
      { property: "og:title", content: "Recetas fáciles para estudiantes foráneos" },
      { property: "og:description", content: "Come rico y nutritivo aunque tengas poco tiempo y presupuesto." },
    ],
  }),
  component: Foraneos,
});

const recetas = [
  { e: "🌮", t: "Tacos de frijol con nopales", min: 10, p: "$", ing: "Tortillas, frijoles de olla, nopales picados, jitomate, cebolla, queso fresco", aporta: "Proteína completa (maíz + frijol), fibra y calcio" },
  { e: "🍳", t: "Huevo a la mexicana", min: 8, p: "$", ing: "2 huevos, jitomate, cebolla, chile serrano, tortillas", aporta: "Proteína de alta calidad, vitaminas A y C" },
  { e: "🥣", t: "Avena nocturna con fruta", min: 5, p: "$", ing: "Avena, leche o bebida de soya, plátano o manzana, canela, semillas", aporta: "Energía de larga duración y fibra" },
  { e: "🍲", t: "Sopa de lentejas en una olla", min: 25, p: "$", ing: "Lentejas, zanahoria, papa, jitomate, ajo, cebolla", aporta: "Hierro, proteína vegetal; rinde para 3 días" },
  { e: "🥗", t: "Ensalada de atún con verduras", min: 10, p: "$$", ing: "Atún en agua, pepino, jitomate, elote, aguacate, limón, galletas integrales", aporta: "Proteína, omega-3 y grasas saludables" },
  { e: "🫔", t: "Quesadillas con flor de calabaza y champiñón", min: 12, p: "$", ing: "Tortillas, queso Oaxaca, flor de calabaza o champiñones, epazote", aporta: "Calcio, vitaminas del complejo B" },
  { e: "🍚", t: "Arroz con verduras y pollo", min: 30, p: "$$", ing: "Arroz, mezcla de verduras congeladas, pechuga deshebrada", aporta: "Plato completo; ideal para preparar por porciones" },
  { e: "🥤", t: "Licuado verde de emergencia", min: 3, p: "$", ing: "Espinaca, plátano, avena, leche o agua, cacahuate", aporta: "Desayuno exprés con fibra y potasio" },
];

const tips = [
  { e: "🛒", t: "Compra en el mercado", d: "Frutas y verduras de temporada son más baratas y nutritivas." },
  { e: "📦", t: "Cocina por lotes", d: "Prepara frijoles, arroz o guisados el domingo y guárdalos en porciones." },
  { e: "🧊", t: "Tu congelador es tu aliado", d: "Congela tortillas, verduras picadas y guisados." },
  { e: "🫙", t: "Despensa básica", d: "Avena, arroz, frijol, lenteja, atún, huevo, tortillas, plátano, jitomate y cebolla." },
  { e: "🚰", t: "Lleva tu botella de agua", d: "Ahorras dinero y evitas refrescos." },
  { e: "⏰", t: "No te saltes el desayuno", d: "Mejora tu concentración en clases." },
];

function Foraneos() {
  return (
    <>
      <PageHero eyebrow="Lejos de casa, cerca de lo rico" title="Recetas fáciles para estudiantes foráneos 🎒" tone="bg-terra/25">
        Poco tiempo, poco presupuesto y una sola parrilla: no es pretexto para comer mal. Aquí tienes ideas que sí nutren.
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {recetas.map((r) => (
          <Card key={r.t} className="flex flex-col transition hover:-translate-y-1 hover:rotate-[-0.5deg]">
            <div className="text-5xl">{r.e}</div>
            <h3 className="mt-3 font-display text-xl font-bold leading-tight">{r.t}</h3>
            <div className="mt-2 flex gap-2 text-xs font-extrabold">
              <span className="rounded-full bg-corn px-2 py-0.5 text-accent-foreground">⏱ {r.min} min</span>
              <span className="rounded-full bg-leaf px-2 py-0.5 text-secondary-foreground">{r.p}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground"><b className="text-foreground">Necesitas:</b> {r.ing}</p>
            <p className="mt-auto pt-3 text-sm font-bold text-primary">✨ {r.aporta}</p>
          </Card>
        ))}
      </section>
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-4xl font-black text-corn">Trucos de supervivencia</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((t) => (
              <div key={t.t} className="rounded-3xl bg-background/10 p-5">
                <div className="text-3xl">{t.e}</div>
                <h3 className="mt-2 font-bold">{t.t}</h3>
                <p className="text-sm opacity-80">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
