import z from 'zod';

export const clientesSchema = z.object({
    nombre: z.string(),
    estatus: z.boolean().default(true)
});

export const evaluarCliente = (data) => {
    return clientesSchema.safeParse(data
    );      
};

export const evaluarClienteParcial = (data) => {
    return clientesSchema.partial().safeParse(data);
};

export default clientesSchema;