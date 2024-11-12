import { useNotification } from 'naive-ui'
import { TIEMPO_MENSAJE } from '@/modules/global/utils/constantes';

const TITULO_ERROR = 'Mensaje de error';
const TITULO_EXITO = 'Mensaje de exito';
const TITULO_ADVERTENCIA = 'Mensaje de advertencia';
const TITULO_AVISO = 'Mensaje de aviso'

export default () => {
    const notification = useNotification();

    const nError = ({ titulo = TITULO_ERROR, mensaje } = {}) => {
        return notification.error({
            keepAliveOnHover: true,
            duration: TIEMPO_MENSAJE,
            meta: mensaje,
            content: titulo
        })
    }

    const nExito = ({ titulo = TITULO_EXITO, mensaje } = {}) => {
        return notification.success({
            keepAliveOnHover: true,
            duration: TIEMPO_MENSAJE,
            meta: mensaje,
            content: titulo
        })
    }

    const nAdvertencia = ({ titulo = TITULO_ADVERTENCIA, mensaje } = {}) => {
        return notification.warning({
            keepAliveOnHover: true,
            duration: TIEMPO_MENSAJE,
            meta: mensaje,
            content: titulo
        })
    }

    const nAviso = ({ titulo = TITULO_AVISO, mensaje } = {}) => {
        return notification.info({
            keepAliveOnHover: true,
            duration: TIEMPO_MENSAJE,
            meta: mensaje,
            content: titulo
        })
    }

    return {
        nAdvertencia,
        nError,
        nAviso,
        nExito
    }
}