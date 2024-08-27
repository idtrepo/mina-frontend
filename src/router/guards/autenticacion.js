import { storeToRefs } from 'pinia'
import { VISTA } from "@/modules/global/utils/vistas";
import useAuthStore from "@/modules/auth/stores/useAuthStore";
import useTituloStore from "@/modules/global/stores/useTituloStore";

export const autenticacionGuard = (to, from, next) => {
    const authStore = useAuthStore();
    const { autenticado } = storeToRefs(authStore);
    const tituloStore = useTituloStore();

    if (!autenticado.value && to.name !== VISTA.LOGIN) {
        next({ name: VISTA.LOGIN });
    } else {
        if (to.name === VISTA.LOGIN) {
            next({ name: VISTA.MODULOS });
        } else {
            tituloStore.establecerTitulo(to.meta?.titulo ?? '');
            next();

        }
    }
}