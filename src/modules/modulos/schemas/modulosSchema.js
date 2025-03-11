import z from 'zod';

const modulosSchema = z.object({
    mac: z.string(),
    idArea: z.number(),
    idSucursal: z.number(),
    idCliente: z.number()
});

export const evaluarModulo = (data) => {
    return modulosSchema.safeParse(data);
}

export default modulosSchema;