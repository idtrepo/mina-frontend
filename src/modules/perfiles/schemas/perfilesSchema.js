import z from "zod";

const PerfilSchema = z.object({
  nombre: z.string().min(1),
  estatus: z.boolean().nullish(),
  acciones:z.array(z.object({
    idAccion: z.number(),
    estatus: z.boolean().nullish(),
  })).nullish(),
});

export const evaluarPerfil = (data) => {
  return PerfilSchema.safeParse(data);
};
