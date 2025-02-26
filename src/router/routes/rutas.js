import { ICONOS } from "@/modules/global/utils/iconos"
import { VISTAS } from "@/modules/global/utils/vistas";
import { PERFILES } from "@/modules/global/utils/perfiles";

export const rutas = [
    {
        perfil:[PERFILES.SUPERUSUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR],
        titulo: 'areas',
        icono: ICONOS.AREAS,
        ruta: VISTAS.AREAS
    },
    {
        perfil:[PERFILES.SUPERUSUARIO],
        titulo: 'clientes',
        icono: ICONOS.CLIENTES,
        ruta: VISTAS.CLIENTES
    },
    {
        perfil:[PERFILES.SUPERUSUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR, PERFILES.OPERADOR],
        titulo: 'modulos',
        icono: ICONOS.MODULOS,
        ruta: VISTAS.MODULOS
    },
    {
        perfil:[PERFILES.SUPERUSUARIO, PERFILES.ADMINISTRADOR],
        titulo: 'perfiles',
        icono: ICONOS.PERFILES,
        ruta: VISTAS.PERFILES
    },
    {
        perfil:[PERFILES.SUPERUSUARIO, PERFILES.ADMINISTRADOR],
        titulo: 'sucursales',
        icono: ICONOS.SUCURSALES,
        ruta: VISTAS.SUCURSALES
    },
    {
        perfil:[PERFILES.SUPERUSUARIO],
        titulo: 'usuarios',
        icono: ICONOS.USUARIOS,
        ruta: VISTAS.USUARIOS
    }
]