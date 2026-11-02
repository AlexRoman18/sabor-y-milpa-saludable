import { describe, expect, it } from "vitest";

import {
  calcularImc,
  clasificarImc,
  gradoObesidad,
  posicionEnEscala,
  rangoPesoSaludable,
} from "./imc";

describe("calcularImc", () => {
  it("divide el peso entre la estatura al cuadrado en metros", () => {
    expect(calcularImc(70, 170)).toBeCloseTo(24.22, 2);
    expect(calcularImc(50, 160)).toBeCloseTo(19.53, 2);
  });

  it("rechaza datos vacíos o imposibles", () => {
    expect(calcularImc(Number.NaN, 170)).toBeNull();
    expect(calcularImc(70, 0)).toBeNull();
    expect(calcularImc(-10, 170)).toBeNull();
    expect(calcularImc(70, 300)).toBeNull();
  });
});

describe("clasificarImc", () => {
  it("usa los cortes oficiales de 18.5, 25 y 30", () => {
    expect(clasificarImc(18.4).clave).toBe("bajo");
    expect(clasificarImc(18.5).clave).toBe("normal");
    expect(clasificarImc(24.9).clave).toBe("normal");
    expect(clasificarImc(25).clave).toBe("sobre");
    expect(clasificarImc(29.9).clave).toBe("sobre");
    expect(clasificarImc(30).clave).toBe("obesidad");
  });

  it("etiqueta la obesidad en grados a partir de 30", () => {
    expect(gradoObesidad(29.9)).toBeNull();
    expect(gradoObesidad(32)).toBe("I");
    expect(gradoObesidad(37)).toBe("II");
    expect(gradoObesidad(41)).toBe("III");
  });
});

describe("rangoPesoSaludable", () => {
  it("da los kilos de un IMC de 18.5 a 24.9 para 1.70 m", () => {
    const [min, max] = rangoPesoSaludable(170);
    expect(min).toBeCloseTo(53.47, 1);
    expect(max).toBeCloseTo(71.96, 1);
  });
});

describe("posicionEnEscala", () => {
  it("mantiene el marcador dentro de la barra", () => {
    expect(posicionEnEscala(12)).toBe(0);
    expect(posicionEnEscala(27.5)).toBe(50);
    expect(posicionEnEscala(99)).toBe(100);
  });
});
