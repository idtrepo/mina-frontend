import z from "zod";

const OperacionSchema = z.object({
  nombre: z.string(),
  estatus: z.boolean().nullish(),
});

export const evaluarOperacion = (data) => {
  return OperacionSchema.safeParse(data);
};

export const evaluarOperacionParcial = (data) => {
  return OperacionSchema.partial().safeParse(data);
};