import z from "zod";

const CredencialesSchema = z.object({
  correo: z.string().email(),
  password: z.string(),
});

export const validarCredenciales = (data) => {
  return CredencialesSchema.safeParse(data);
};
