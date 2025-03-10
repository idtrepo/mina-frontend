import z from 'zod'

const UsuarioSchema = z.object({
    correo: z.string().email(),
    password: z.string().nullish(),
    nombre: z.string(),
    apellido: z.string(),
    idPerfil: z.number().gt(0),
    idCliente: z.number().gt(0).nullish(),
    estatus: z.boolean().default(true)
});

export const evaluarUsuario =  (data) => {
    return  UsuarioSchema.safeParse(data);
}

export const evaluarUsuarioParcial =  (data) => {
    return  UsuarioSchema.partial().safeParse(data);
}