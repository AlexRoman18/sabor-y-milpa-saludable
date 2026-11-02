import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Card, PageHero } from "@/components/site";
import {
  CATEGORIAS,
  ESCALA,
  calcularImc,
  clasificarImc,
  gradoObesidad,
  posicionEnEscala,
  rangoPesoSaludable,
} from "@/lib/imc";

export const Route = createFileRoute("/imc")({
  head: () => ({
    meta: [
      { title: "Calcula tu IMC — Nutre" },
      { name: "description", content: "Calcula tu índice de masa corporal y conoce tu estado de nutrición con los rangos oficiales del IMSS." },
      { property: "og:title", content: "Calcula tu IMC" },
      { property: "og:description", content: "Pesa, mide y descubre en qué rango estás: bajo peso, normal, sobrepeso u obesidad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImcPage,
});

const ancho = (desde: number, hasta: number) => {
  const d = Math.max(ESCALA.min, desde);
  const h = Math.min(ESCALA.max, hasta);
  return ((h - d) / (ESCALA.max - ESCALA.min)) * 100;
};

function Campo({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

const inputClass =
  "mt-1 w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-lg font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20";

function ImcPage() {
  const [sexo, setSexo] = useState<"femenino" | "masculino">("femenino");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const imc = useMemo(
    () => calcularImc(parseFloat(peso.replace(",", ".")), parseFloat(altura.replace(",", "."))),
    [peso, altura],
  );
  const categoria = imc === null ? null : clasificarImc(imc);
  const grado = imc === null ? null : gradoObesidad(imc);
  const saludables = altura === "" ? null : rangoPesoSaludable(parseFloat(altura.replace(",", ".")));
  const datosListos = peso !== "" && altura !== "";
  const edadNum = parseFloat(edad);

  return (
    <>
      <PageHero eyebrow="Herramienta" title="¿Cómo está tu IMC? ⚖️" tone="bg-corn/40">
        El índice de masa corporal (IMC) relaciona tu peso con tu estatura. Escribe tus datos y compáralos con los
        rangos que usa la calculadora del IMSS.
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <h2 className="font-display text-2xl font-black">Tus datos</h2>
          <p className="mt-1 text-sm text-muted-foreground">Como los pide la calculadora oficial: sexo, edad, peso y altura.</p>

          <div className="mt-6 space-y-5">
            <Campo label="Sexo">
              <div className="mt-2 flex gap-2">
                {(["femenino", "masculino"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSexo(s)}
                    className={`flex-1 rounded-2xl border-2 px-4 py-3 font-bold capitalize transition ${
                      sexo === s ? "border-primary bg-primary text-primary-foreground" : "border-input hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Campo>

            <Campo label="Edad" hint="En años. Solo sirve para interpretar el resultado.">
              <input
                className={inputClass}
                type="number"
                inputMode="numeric"
                min={1}
                max={110}
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                placeholder="25"
              />
            </Campo>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo label="Peso" hint="Kilogramos">
                <input
                  className={inputClass}
                  type="number"
                  inputMode="decimal"
                  min={15}
                  max={400}
                  step="0.1"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  placeholder="68"
                />
              </Campo>
              <Campo label="Altura" hint="Centímetros">
                <input
                  className={inputClass}
                  type="number"
                  inputMode="decimal"
                  min={60}
                  max={250}
                  step="0.1"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  placeholder="165"
                />
              </Campo>
            </div>
          </div>

          {datosListos && imc === null && (
            <p className="mt-5 rounded-2xl bg-destructive/10 p-4 text-sm font-bold text-destructive">
              Revisa los datos: el peso y la altura deben ser números reales (por ejemplo 68 kg y 165 cm).
            </p>
          )}
        </Card>

        <Card className="flex flex-col justify-between overflow-hidden">
          {imc === null || categoria === null ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <span className="text-6xl">🥑</span>
              <p className="mt-4 max-w-xs font-display text-2xl font-black">Escribe tu peso y tu altura</p>
              <p className="mt-2 text-sm text-muted-foreground">
                En cuanto los pongas, aquí aparece tu IMC y en qué rango estás.
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">Tu IMC es</p>
                <p className="font-display text-7xl font-black leading-none md:text-8xl">{imc.toFixed(1)}</p>
                <div className={`mt-4 inline-flex flex-wrap items-center gap-2 rounded-full ${categoria.color} px-5 py-2 font-display text-xl font-black text-foreground`}>
                  <span>{categoria.etiqueta}</span>
                  {grado && <span className="text-sm font-bold opacity-80">grado {grado}</span>}
                </div>
                <p className="mt-4 max-w-md text-muted-foreground">{categoria.advice}</p>
              </div>

              <div className="mt-8">
                <div className="flex h-6 w-full overflow-hidden rounded-full">
                  {CATEGORIAS.map((c) => (
                    <div key={c.clave} className={`${c.color} h-full`} style={{ width: `${ancho(c.desde, c.hasta)}%` }} />
                  ))}
                </div>
                <div className="relative mt-1 h-10">
                  <div className="absolute -translate-x-1/2" style={{ left: `${posicionEnEscala(imc)}%` }}>
                    <div className="mx-auto h-4 w-1.5 rounded-full bg-foreground" />
                    <div className="rounded-full bg-foreground px-2 py-0.5 text-xs font-black text-background">▲</div>
                  </div>
                  {[18.5, 25, 30].map((n) => (
                    <span
                      key={n}
                      className="absolute -translate-x-1/2 text-xs font-bold text-muted-foreground"
                      style={{ left: `${posicionEnEscala(n)}%`, top: "1.5rem" }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {saludables && Number.isFinite(saludables[0]) && (
                <p className="mt-4 rounded-2xl bg-muted p-4 text-sm font-semibold">
                  Para tu altura, un peso de entre {saludables[0].toFixed(1)} kg y {saludables[1].toFixed(1)} kg
                  corresponde a un IMC de 18.5 a 24.9.
                </p>
              )}
            </>
          )}
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="font-display text-4xl font-black">Los cuatro rangos</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIAS.map((c) => (
            <Card key={c.clave} className="p-0">
              <div className={`${c.color} rounded-t-3xl px-6 py-3 font-display text-xl font-black`}>{c.etiqueta}</div>
              <p className="px-6 pt-4 font-display text-2xl font-black">{c.rango}</p>
              <p className="px-6 pb-6 pt-2 text-sm text-muted-foreground">{c.advice}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <Card className="bg-sky/25">
          <h2 className="font-display text-2xl font-black">Ten esto en cuenta 🧠</h2>
          <ul className="mt-4 space-y-2 text-sm font-semibold">
            <li className="flex gap-2"><span className="text-primary">●</span>El IMC no distingue entre músculo, grasa y hueso: un deportista puede salir en “sobrepeso” estando sano.</li>
            <li className="flex gap-2"><span className="text-primary">●</span>No se usa igual en embarazo, ni en menores de 20 años, donde se revisan percentiles de crecimiento.</li>
            {Number.isFinite(edadNum) && edadNum > 0 && edadNum < 20 && (
              <li className="flex gap-2"><span className="text-primary">●</span>Tienes {edadNum} años: este número es orientativo. Tu médica o médico debe valorarlo con una tabla de edad y estatura.</li>
            )}
            {Number.isFinite(edadNum) && edadNum >= 60 && (
              <li className="flex gap-2"><span className="text-primary">●</span>Después de los 60 importa más cuidar el músculo y la hidratación que el número por sí solo.</li>
            )}
            <li className="flex gap-2"><span className="text-primary">●</span>La cintura y tus análisis de sangre dicen más que el IMC: pídelos en tu consulta.</li>
            <li className="flex gap-2"><span className="text-primary">●</span>Este cálculo es informativo y no sustituye la consulta con un profesional de la salud o nutrición.</li>
          </ul>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Fuente: IMSS — Salud en línea,{" "}
            <a
              className="underline"
              href="https://www.imss.gob.mx/salud-en-linea/calculaimc"
              target="_blank"
              rel="noreferrer"
            >
              Conoce tu estado de nutrición
            </a>
            .
          </p>
        </Card>
      </section>
    </>
  );
}
