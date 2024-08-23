import router from ".."
import useAuthStore from "@/modules/auth/stores/useAuthStore";
import { SIMBOLO } from "@/modules/global/utils/simbolos"
import { VISTA } from "@/modules/global/utils/vistas";

const moverAVista = (vista) => {
    return router.push({ name: vista });
}

const cerrarSesion = () => {
    const authStore = useAuthStore();

    authStore.cerrarSesion();
    router.push({ name: VISTA.LOGIN });
}

export const rutas = [
    {
        nombre: 'areas',
        icono: SIMBOLO.AREAS,
        metodo: () => moverAVista(VISTA.AREAS)
    },
    {
        nombre: 'clientes',
        icono: SIMBOLO.CLIENTES,
        metodo: () => moverAVista(VISTA.CLIENTES)
    },
    {
        nombre: 'modulos',
        icono: SIMBOLO.MODULOS,
        metodo: () => moverAVista(VISTA.MODULOS)
    },
    {
        nombre: 'perfiles',
        icono: SIMBOLO.PERFILES,
        metodo: () => moverAVista(VISTA.PERFILES)
    },
    {
        nombre: 'sucursales',
        icono: SIMBOLO.SUCURSALES,
        metodo: () => moverAVista(VISTA.SUCURSALES)
    },
    {
        nombre: 'usuarios',
        icono: SIMBOLO.USUARIOS,
        metodo: () => moverAVista(VISTA.USUARIOS)
    }
]

export const rutaSalida = {
    nombre: 'salir',
    icono: SIMBOLO.SALIDA,
    metodo: () => cerrarSesion()
}