import { createFileRoute } from "@tanstack/react-router";
import comer from "@/assets/comer.asset.json";
import beber from "@/assets/beber.asset.json";
import { Card, PageHero } from "@/components/site";

export const Route = createFileRoute("/platos")({
  head: () => ({
    meta: [
      { title: "Plato del Bien Comer y Jarra del Buen Beber — Nutre" },
      { name: "description", content: "Grupos de alimentos del Plato del Bien Comer y los 6 niveles de la Jarra del Buen Beber." },
      { property: "og:title", content: "Plato del Bien Comer y Jarra del Buen Beber" },
      { property: "og:description", content: "Qué comer y qué beber, según la guía oficial mexicana." },
    ],
  }),
  component: Platos,
});

const grupos = [
  { t: "Verduras y frutas", c: "bg-leaf", d: "Fuente de vitaminas, minerales y fibra. Come muchas, de temporada y de preferencia crudas y con cáscara.", ej: "Calabacita, nopal, jitomate, chayote, guayaba, papaya, naranja" },
  { t: "Cereales, granos y tubérculos", c: "bg-corn", d: "Dan energía. Elige integrales y combínalos con leguminosas.", ej: "Tortilla de maíz, avena, arroz, amaranto, papa, camote" },
  { t: "Leguminosas", c: "bg-terra", d: "Proteína vegetal y fibra. Inclúyelas a diario.", ej: "Frijol, lenteja, garbanzo, haba, alubia" },
  { t: "Origen animal", c: "bg-sky", d: "Proteína de alto valor. Consume pocas cantidades; prefiere pescado, pollo sin piel y huevo.", ej: "Huevo, pescado, pollo, queso fresco, leche" },
  { t: "Aceites y grasas saludables", c: "bg-muted", d: "En poca cantidad. Prefiere grasas de origen vegetal.", ej: "Aguacate, aceite de oliva o canola, nueces, semillas" },
];

const jarra = [
  { n: 1, t: "Agua potable natural", q: "6 – 8 vasos", w: "w-full", c: "bg-sky" },
  { n: 2, t: "Leche semi o descremada y bebidas de soya sin azúcar", q: "0 – 2 vasos", w: "w-11/12", c: "bg-leaf" },
  { n: 3, t: "Café y té sin azúcar", q: "0 – 4 tazas", w: "w-10/12", c: "bg-muted" },
  { n: 4, t: "Bebidas no calóricas con edulcorantes", q: "0 – 2 vasos", w: "w-9/12", c: "bg-terra/60" },
  { n: 5, t: "Jugos, leche entera, alcohol o deportivas", q: "0 – ½ vaso", w: "w-8/12", c: "bg-terra" },
  { n: 6, t: "Refrescos y aguas de sabor", q: "0 vasos", w: "w-7/12", c: "bg-corn" },
];

function Platos() {
  return (
    <>
      <PageHero eyebrow="Guía oficial · NOM-043-SSA2" title="El Plato del Bien Comer y la Jarra del Buen Beber">
        Dos herramientas visuales de la Secretaría de Salud para armar comidas y bebidas saludables todos los días.
      </PageHero>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
        <img src={comer.url} alt="Plato del Bien Comer" className="mx-auto w-full max-w-md" loading="lazy" />
        <div>
          <h2 className="font-display text-4xl font-black">🍽️ Plato del Bien Comer</h2>
          <p className="mt-3 text-muted-foreground">
            Divide los alimentos en 5 grupos. En cada comida incluye al menos uno de cada grupo, varía y elige productos de temporada y producción local. Al centro está el agua: tu bebida principal.
          </p>
          <p className="mt-4 rounded-2xl bg-destructive/10 p-4 font-bold text-destructive">⛔ Evita productos con sellos de advertencia.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {grupos.map((g) => (
          <Card key={g.t}>
            <span className={`${g.c} inline-block h-3 w-16 rounded-full`} />
            <h3 className="mt-3 font-display text-xl font-bold">{g.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{g.d}</p>
            <p className="mt-3 text-sm font-bold">Ej.: {g.ej}</p>
          </Card>
        ))}
      </section>

      <section className="mt-20 bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-black">💧 Jarra del Buen Beber</h2>
            <p className="mt-3 text-muted-foreground">Ordena las bebidas en 6 niveles: de la más recomendable (abajo) a la que debes evitar (arriba).</p>
            <div className="mt-6 flex flex-col-reverse gap-2">
              {jarra.map((j) => (
                <div key={j.n} className={`${j.c} ${j.w} flex min-w-0 items-center justify-between gap-3 rounded-2xl px-4 py-3`}>
                  <span className="min-w-0 text-sm font-bold"><span className="font-display text-lg">N{j.n}</span> · {j.t}</span>
                  <span className="shrink-0 whitespace-nowrap text-sm font-black">{j.q}</span>
                </div>
              ))}
            </div>
          </div>
          <img src={beber.url} alt="Jarra del Buen Beber" className="w-full rounded-3xl" loading="lazy" />
        </div>
      </section>
    </>
  );
}
