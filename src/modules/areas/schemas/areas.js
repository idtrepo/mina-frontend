import z from 'zod';

const AreaSchema = z.object({
    nombre: z.string().min(1),
    idSucursal: z.string().min(1),
    estatus: z.boolean().nullish(),
    });

export const evaluarArea = (data) => {
    return AreaSchema.safeParse(data);
};