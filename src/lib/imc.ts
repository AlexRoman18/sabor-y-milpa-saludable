// Lógica del índice de masa corporal (IMC).
// Rangos oficiales para población adulta (OMS / NOM-031, usados por la
// calculadora "Conoce tu estado de nutrición" del IMSS).

export type ImcCategoria = {
  clave: "bajo" | "normal" | "sobre" | "obesidad";
  etiqueta: string;
  rango: string;
  desde: number;
  hasta: number;
  color: string;
  advice: string;
};

export const ESCALA = { min: 15, max: 40 } as const;

export const CATEGORIAS: ImcCategoria[] = [
  {
    clave: "bajo",
    etiqueta: "Bajo peso",
    rango: "Menos de 18.5",
    desde: 0,
    hasta: 18.5,
    color: "bg-sky",
    advice: "Come con más frecuencia y agrega alimentos nutritivos: tortilla con frijol, huevo, aguacate, nueces y leche.",
  },
  {
    clave: "normal",
    etiqueta: "Peso normal",
    rango: "18.5 a 24.9",
    desde: 18.5,
    hasta: 25,
    color: "bg-leaf",
    advice: "Sigue así: plato del bien comer en cada comida, agua simple y al menos 30 minutos de movimiento al día.",
  },
  {
    clave: "sobre",
    etiqueta: "Sobrepeso",
    rango: "25 a 29.9",
    desde: 25,
    hasta: 30,
    color: "bg-corn",
    advice: "Baja refrescos y alimentos con sellos, aumenta verduras y camina más. Un nutriólogo puede armarte un plan realista.",
  },
  {
    clave: "obesidad",
    etiqueta: "Obesidad",
    rango: "30 o más",
    desde: 30,
    hasta: Infinity,
    color: "bg-terra",
    advice: "Acude con tu médico o nutriólogo: con cambios graduales de alimentación y actividad se logran mejoras reales.",
  },
];

export const LIMITES = {
  pesoMin: 15,
  pesoMax: 400,
  alturaMin: 60,
  alturaMax: 250,
} as const;

/** IMC = peso (kg) / estatura (m)². Devuelve null si los datos no son válidos. */
export function calcularImc(pesoKg: number, alturaCm: number): number | null {
  if (!Number.isFinite(pesoKg) || !Number.isFinite(alturaCm)) return null;
  if (pesoKg < LIMITES.pesoMin || pesoKg > LIMITES.pesoMax) return null;
  if (alturaCm < LIMITES.alturaMin || alturaCm > LIMITES.alturaMax) return null;
  const metros = alturaCm / 100;
  return pesoKg / (metros * metros);
}

export function clasificarImc(imc: number): ImcCategoria {
  if (imc < 18.5) return CATEGORIAS[0];
  if (imc < 25) return CATEGORIAS[1];
  if (imc < 30) return CATEGORIAS[2];
  return CATEGORIAS[3];
}

/** Grado de obesidad (solo aplica con IMC de 30 o más). */
export function gradoObesidad(imc: number): "I" | "II" | "III" | null {
  if (imc < 30) return null;
  if (imc < 35) return "I";
  if (imc < 40) return "II";
  return "III";
}

/** Kilos que corresponden a un IMC de 18.5 a 24.9 para esa estatura. */
export function rangoPesoSaludable(alturaCm: number): [number, number] {
  const metros = alturaCm / 100;
  return [18.5 * metros * metros, 24.9 * metros * metros];
}

/** Posición (0 a 100 %) del IMC dentro de la escala dibujada. */
export function posicionEnEscala(imc: number): number {
  const crudo = ((imc - ESCALA.min) / (ESCALA.max - ESCALA.min)) * 100;
  return Math.min(100, Math.max(0, crudo));
}
