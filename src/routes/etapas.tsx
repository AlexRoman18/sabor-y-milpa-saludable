import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero } from "@/components/site";

export const Route = createFileRoute("/etapas")({
  head: () => ({
    meta: [
      { title: "Nutrición por etapa de vida — Nutre" },
      { name: "description", content: "Recomendaciones de alimentación para adolescentes, adultos y personas mayores." },
      { property: "og:title", content: "Nutrición por etapa de vida" },
      { property: "og:description", content: "Lo que necesitas comer cambia con la edad. Descubre cómo." },
    ],
  }),
  component: Etapas,
});

const etapas = [
  {
    e: "🧑‍🎓", t: "Adolescentes", c: "bg-corn", fuente: "Stanford Children's",
    items: [
      "Etapa de crecimiento rápido: necesitan más energía, proteína, calcio y hierro.",
      "Calcio para huesos fuertes: lácteos, tortilla nixtamalizada, verduras de hoja verde.",
      "Hierro, sobre todo en chicas: frijol, lenteja, carnes magras y espinaca con vitamina C.",
      "Desayunar todos los días y limitar comida rápida, refrescos y bebidas energéticas.",
      "Evitar dietas restrictivas sin supervisión profesional.",
    ],
  },
  {
    e: "🧑", t: "Adultos", c: "bg-leaf", fuente: "IMSS",
    items: [
      "Seguir el Plato del Bien Comer en cada comida.",
      "Reducir sal, azúcar y grasas saturadas para prevenir diabetes, hipertensión y obesidad.",
      "Mantener un peso saludable y medir tu cintura periódicamente.",
      "Al menos 30 minutos de actividad física al día.",
      "Acudir a revisiones médicas preventivas.",
    ],
  },
  {
    e: "👵", t: "Personas mayores", c: "bg-sky", fuente: "Clínic Barcelona",
    items: [
      "Necesitan menos calorías pero igual o más proteína para conservar el músculo.",
      "Hidratarse aunque no tengan sed: la sensación disminuye con la edad.",
      "Calcio y vitamina D para prevenir osteoporosis; tomar sol con moderación.",
      "Texturas suaves si hay problemas para masticar o tragar: purés, guisados, cremas.",
      "Comer acompañados y en horarios regulares; vigilar pérdida de peso o apetito.",
    ],
  },
];

function Etapas() {
  return (
    <>
      <PageHero eyebrow="Para toda la familia" title="Cada edad tiene su plato 👨‍👩‍👧‍👦" tone="bg-sky/30">
        Las necesidades nutricionales cambian a lo largo de la vida. Estas son las claves para cada etapa.
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-3">
        {etapas.map((et) => (
          <Card key={et.t} className="overflow-hidden p-0">
            <div className={`${et.c} flex items-center justify-between p-6`}>
              <h2 className="font-display text-2xl font-black">{et.t}</h2>
              <span className="text-5xl">{et.e}</span>
            </div>
            <ul className="space-y-3 p-6">
              {et.items.map((i) => (
                <li key={i} className="flex gap-2 text-sm"><span className="text-primary">●</span>{i}</li>
              ))}
            </ul>
            <p className="px-6 pb-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Fuente: {et.fuente}</p>
          </Card>
        ))}
      </section>
    </>
  );
}
