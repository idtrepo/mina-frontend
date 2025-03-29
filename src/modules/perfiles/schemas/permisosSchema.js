import z from "zod";

const PermisoSchema = z.object({
  idPerfil: z.number(),
  idAccion: z.number(),
  estatus: z.boolean().nullish(),
});

export const evaluarPermiso = (data) => {
  return PermisoSchema.safeParse(data);
};

export const evaluarPermisoParcial = (data) => {
  return PermisoSchema.partial().safeParse(data);
};
