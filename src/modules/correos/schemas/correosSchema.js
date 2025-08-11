import z from "zod";

export const correoSchema = z.object({
    correo: z.string().email().nullish(),
    idCliente: z.number(),
    usuario: z.object({
        id: z.number(),
    }).nullish(),
});

export const evaluarCorreo = (data) => {
    return correoSchema.safeParse(data);
}