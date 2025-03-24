import z from "zod";

const AccionSchema = z.object({
  nombre: z.string(),
  idOperacion: z.number(),
  idCategoria: z.number(),
  estatus: z.boolean().nullish(),
});

export const evaluarAccion = (data) => {
  return AccionSchema.safeParse(data);
};

export const evaluarAccionParcial = (data) => {
  return AccionSchema.partial().safeParse(data);
};
