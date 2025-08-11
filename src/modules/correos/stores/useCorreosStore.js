import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("correos-store", () => {
    const correo = ref({
        correo: null,
        idCliente: null,
        usuario: null,
    });
  const correos = ref([]);
  const numeroElementos = ref(0);

  const asignarDataCorreos = ({ data, resultados }) => {
    correos.value = data;
    numeroElementos.value = resultados;
  };

  const asignarDataCorreo = ({ data }) => {
    const { id, correo: correoStr, cliente, usuario } = data;
    correo.value["id"] = id;
    correo.value.correo = correoStr;
    correo.value.idCliente = cliente.id;
    correo.value.usuario = usuario ?? null;
  };

  const correosOpciones = computed(() =>
    correos.value.map(({ id, asunto }) => ({
      label: asunto,
      value: id,
    }))
  );

  return {
    correo,
    correos,
    numeroElementos,
    asignarDataCorreos,
    asignarDataCorreo,
    correosOpciones,
  };
});