import z from "zod";

const SensoresSchema = z.object({
  clave: z.string(),
  idModulo: z.number().gt(0),
});

export const evaluarSensor = (data) => {
  return SensoresSchema.safeParse(data);
};

export const evaluarSensorParcial = (data) => {
  return SensoresSchema.partial().safeParse(data);
};
