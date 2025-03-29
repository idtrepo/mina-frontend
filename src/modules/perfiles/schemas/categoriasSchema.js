import z from "zod";

const CategoriaSchema = z.object({
  nombre: z.string(),
  estatus: z.boolean().nullish(),
});

export const evaluarCategoria = (data) => {
  return CategoriaSchema.safeParse(data);
};

export const evaluarCategoriaParcial = (data) => {
  return CategoriaSchema.partial().safeParse(data);
};
