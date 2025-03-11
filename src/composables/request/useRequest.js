import { toValue } from "vue";
import { useNotification } from "naive-ui";

export default ({
  servicio,
  filtros,
  evaluacion = null,
  evaluacionParcial = null,
} = {}) => {
  const notification = useNotification();

  const obtenerElementos = async ({ params = null } = {}) => {
    params = {
      ...toValue(filtros),
      ...params,
    };

    try {
      const res = await servicio.obtenerElementos({ params });
      return res;
    } catch (err) {
      return null;
    }
  };

  const obtenerElemento = async ({ id }) => {
    try {
      const res = await servicio.obtenerElemento({ id });
      return res;
    } catch (err) {
      return null;
    }
  };

  const crearElemento = async ({ dataElemento }) => {
    const { error, data } = evaluacion(toValue(dataElemento));

    if (error) {
      notification.warning({
        meta: "Los datos ingresados son incorrectos o faltan por ingresar",
        content: "Mensaje de validacion",
        duration: 5000,
        keepAliveOnHover: true,
      });
      return;
    }

    try {
      const res = await servicio.crearElemento({ data });
      const { mensaje } = res;

      notification.success({
        meta: mensaje,
        content: "Mensaje de creacion",
        duration: 5000,
        keepAliveOnHover: true,
      });
      return res;
    } catch ({ error }) {
      console.log(error);
      notification.error({
        meta: error,
        content: "Mensaje de creacion",
        duration: 5000,
        keepAliveOnHover: true,
      });
      return null;
    }
  };

  const editarElemento = async ({ dataElemento }) => {
    let data, error;

    const { id, ...dataEditar } = toValue(dataElemento);
    console.log(dataEditar)
    if (evaluacionParcial) {
      const { data: dataEdicion, error: errorEdicion } =
        evaluacionParcial(dataEditar);

      data = dataEdicion;
      error = errorEdicion;
    } else {
      const { data: dataEdicion, error: errorEdicion } = evaluacion(dataEditar);
      data = dataEdicion;
      error = errorEdicion;
    }

    if (error) {
      console.log(error)
      notification.warning({
        meta: "Los datos ingresados son incorrectos o faltan por ingresar",
        content: "Mensaje de validacion",
        duration: 5000,
        keepAliveOnHover: true,
      });
      return;
    }

    try {
      const res = await servicio.editarElemento({
        id,
        data,
      });
      const { mensaje } = res;
      notification.success({
        meta: mensaje,
        content: "Mensaje de edicion",
        duration: 5000,
        keepAliveOnHover: true,
      });

      return res;
    } catch ({ error }) {
      notification.error({
        meta: error,
        content: "Mensaje de edicion",
        duration: 5000,
        keepAliveOnHover: true,
      });
      return null;
    }
  };
  
  const obtenerElementoData = async ({ id }) => {
    try {
      const res = await servicio.obtenerElementoData({ id });
      return res;
    } catch (err) {
      return null;
    }
  }
  return {
    obtenerElemento,
    obtenerElementos,
    crearElemento,
    editarElemento,
    obtenerElementoData,
  };
};
