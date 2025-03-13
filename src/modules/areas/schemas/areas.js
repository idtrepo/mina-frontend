import z from "zod";

const AreaSchema = z.object({
  nombre: z.string(),
  idSucursal: z.number(),
});

export const evaluarArea = (data) => {
  return AreaSchema.safeParse(data);
};

export const evaluarAreaParcial = (data) => {
  return AreaSchema.partial().safeParse(data);
};
