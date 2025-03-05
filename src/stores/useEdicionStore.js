import { ref, toValue, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("edicion-store", () => {
  const copia = ref(null);
  const editar = ref(false);
  const esEdicion = computed(() => !!copia.value?.id);
  const edicionHabilitada = computed(() => {
    if (
      (esEdicion.value && editar.value) ||
      (!esEdicion.value && !editar.value)
    )
      return false;

    return true;
  });

  const guardarData = (data) => {
    copia.value = { ...toValue(data) };
  };

  const borrarData = () => {
    const data = { ...toValue(copia) };

    return data;
  };

  const habilitarEdicion = () => {
    editar.value = !editar.value;
  };

  const reiniciarEdicion = () => {
    copia.value = null;
    editar.value = false;
  };

  return {
    copia,
    esEdicion,
    guardarData,
    borrarData,
    editar,
    habilitarEdicion,
    reiniciarEdicion,
    edicionHabilitada,
  };
});
