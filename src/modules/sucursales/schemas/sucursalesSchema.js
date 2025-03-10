import z from 'zod';

const SucursalSchema = z.object({
    nombre: z.string(),
    idCliente: z.number().gt(0),
    estatus: z.boolean().default(true)
});

export const evaluarSucursal =  (data) => {
    return  SucursalSchema.safeParse(data);
}

export const evaluarSucursalParcial =  (data) => {
    return  SucursalSchema.partial().safeParse(data);
}

export default SucursalSchema;