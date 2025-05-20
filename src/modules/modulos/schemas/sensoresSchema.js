import z from "zod";

const SensoresSchema = z.object({
  clave: z.string(),
  idModulo: z.number().gt(0),
  umbral: z.number().gt(0).nullish(),
  identificador: z.string().nullish(),
});

export const evaluarSensor = (data) => {
  return SensoresSchema.safeParse(data);
};

export const evaluarSensorParcial = (data) => {
  return SensoresSchema.partial().safeParse(data);
};
