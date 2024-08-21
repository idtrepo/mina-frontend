import z from 'zod'

const UsuarioSchema = z.object({
    correo: z.string().email(),
    password: z.string(),
    nombre: z.string(),
    apellido: z.string(),
    idPerfil: z.number().gt(0),
    idCliente: z.number().gt(0).nullish(),
    estatus: z.boolean().default(true)
});

export const evaluarUsuario = async (data) => {
    return await UsuarioSchema.safeParseAsync(data);
}

export const evaluarUsuarioParcial = async (data) => {
    return await UsuarioSchema.partial().safeParseAsync(data);
}