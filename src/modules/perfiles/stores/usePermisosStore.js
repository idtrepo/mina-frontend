import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("permisos-store", () => {
  const permiso = ref({
    nombre: null,
  });

  const permisos = ref([]);
  const numeroElementos = ref(1);

  const permisosOpciones = computed(() =>
    permisos.value.map(({ id, nombre }) => ({
      label: nombre,
      value: id,
    }))
  );

  const asignarDataPermisos = ({ data, resultados }) => {
    permisos.value = data.map(({ perfil, accion, id }) => ({
      id,
      perfil,
      accion: { ...accion, agregar: false },
    }));
    numeroElementos.value = resultados;
  };

  const asignarDataPermiso = ({ data }) => {
    const { id, nombre } = data;
    permiso.value["id"] = id;
    permiso.value.nombre = nombre;
  };

  return {
    permiso,
    permisos,
    numeroElementos,
    permisosOpciones,
    asignarDataPermisos,
    asignarDataPermiso,
  };
});
