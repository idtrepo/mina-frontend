import { ref, computed, toValue } from "vue";
import { defineStore } from "pinia";

export default defineStore("acciones-store", () => {
  const accion = ref({
    nombre: null,
    idOperacion: null,
    idCategoria: null,
  });

  const acciones = ref([]);
  const numeroElementos = ref(1);

  const accionesOpciones = computed(() =>
    acciones.value.map(({ id, nombre }) => ({
      label: nombre,
      value: id,
    }))
  );

  const asignarDataAcciones = ({ data, resultados }, permisos = null) => {
    console.log("DATA DE PERMISOS EN ACCIONES");
    console.log(permisos);
    console.log("DATA DE ACCIONES");
    console.log(data);

    if (!permisos) {
      console.log("NO HAY PERMISOS");

      acciones.value = data.map((accion, index) => ({
        ...accion,
        index,
        asignar: false,
      }));
    } else {
      console.log("HAY PERMISOS");

      acciones.value = data.map((accion, index) => {
        let asignar = false;

        asignar = permisos.some(
          ({ accion: permisoAccion }) => permisoAccion.id === accion.id
        );

        return {
          ...accion,
          index,
          asignar,
        };
      });
    }

    numeroElementos.value = resultados;
  };

  const asignarDataAccion = ({ data }) => {
    const { id, nombre } = data;
    accion.value["id"] = id;
    accion.value.nombre = nombre;
  };

  return {
    accion,
    acciones,
    numeroElementos,
    accionesOpciones,
    asignarDataAcciones,
    asignarDataAccion,
  };
});
