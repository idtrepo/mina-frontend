import z from "zod";

export const clientesSchema = z.object({
  nombre: z.string(),
});

export const evaluarCliente = (data) => {
  return clientesSchema.safeParse(data);
};

export default clientesSchema;
