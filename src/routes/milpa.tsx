import { createFileRoute } from "@tanstack/react-router";
import milpa from "@/assets/milpa.asset.json";
import { Card, PageHero } from "@/components/site";

export const Route = createFileRoute("/milpa")({
  head: () => ({
    meta: [
      { title: "La dieta de la milpa — Nutre" },
      { name: "description", content: "Modelo de alimentación mesoamericana saludable y sustentable de la Secretaría de Salud." },
      { property: "og:title", content: "La dieta de la milpa" },
      { property: "og:description", content: "Comer como nuestros abuelos: maíz, frijol, calabaza, chile y más." },
    ],
  }),
  component: Milpa,
});

const grupos = [
  { e: "🥬", t: "Verduras y hortalizas", d: "Quelites, nopal, chayote, flor de calabaza, hongos, chile, jitomate." },
  { e: "🥭", t: "Frutas", d: "Papaya, mamey, tuna, pitaya, guayaba, capulín, nanche, xoconostle." },
  { e: "🌽", t: "Cereales integrales", d: "Maíz nixtamalizado (tortilla, tamal, tlacoyo), amaranto, pinole." },
  { e: "🫘", t: "Semillas y leguminosas", d: "Frijol, chía, cacahuate, pepitas de calabaza, cacao." },
  { e: "🥑", t: "Aceites cardioprotectores", d: "Aguacate y aceites vegetales insaturados." },
  { e: "🐟", t: "Proteína animal", d: "Guajolote, pescado, huevo, insectos y requesón — con moderación." },
  { e: "🍠", t: "Tubérculos", d: "Camote, yuca, jícama, chinchayote." },
  { e: "🍯", t: "Endulzantes", d: "Miel y piloncillo, en pequeñas cantidades." },
];

const principios = [
  "Basada en alimentos locales, de temporada y mínimamente procesados.",
  "Prioriza vegetales: el centro es la triada maíz–frijol–calabaza, más el chile.",
  "La combinación maíz + frijol aporta proteína completa.",
  "Es sustentable: cuida el ambiente y la economía local.",
  "Rescata la cultura y la identidad gastronómica de México.",
  "Promueve la lactancia materna: inmediata, exclusiva 6 meses y continua hasta los 2 años (OMS).",
];

function Milpa() {
  return (
    <>
      <PageHero eyebrow="Secretaría de Salud" title="La dieta de la milpa 🌽" tone="bg-corn/40">
        Un modelo de alimentación mesoamericana que combina lo saludable con lo sustentable, inspirado en lo que comían nuestros pueblos originarios.
      </PageHero>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_1fr]">
        <img src={milpa.url} alt="Ilustración de la dieta de la milpa" className="w-full" loading="lazy" />
        <div>
          <h2 className="font-display text-3xl font-black">¿Por qué la milpa?</h2>
          <ul className="mt-5 space-y-3">
            {principios.map((p) => (
              <li key={p} className="flex gap-3"><span className="text-xl">🌱</span><span>{p}</span></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-black">Sus 8 grupos</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {grupos.map((g) => (
            <Card key={g.t}>
              <div className="text-4xl">{g.e}</div>
              <h3 className="mt-2 font-display text-lg font-bold">{g.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.d}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
