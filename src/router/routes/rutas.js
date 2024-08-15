import router from ".."
import { SIMBOLO_MODULOS, SIMBOLO_SALIDA, SIMBOLO_USUARIOS } from "@/utils/simbolos"
import { VISTA_MODULOS } from "@/utils/vistas";

const moverAVista = (vista) => {
    return router.push({ name: vista });
}

export const rutas = [
    {
        nombre: 'usuarios',
        icono: SIMBOLO_USUARIOS,
        metodo: () => console.log('Hola usuarios')
    },
    {
        nombre: 'modulos',
        icono: SIMBOLO_MODULOS,
        metodo: () => moverAVista(VISTA_MODULOS)
    }
]

export const rutaSalida = {
    nombre: 'salir',
    icono: SIMBOLO_SALIDA,
    metodo: () => console.log('SALIR')
}