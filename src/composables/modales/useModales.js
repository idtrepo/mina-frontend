import { ref } from "vue";

export default () => {
  const verModal = ref(false);

  const mostrarModal = () => {
    verModal.value = true;
  };

  const ocultarModal = () => {
    verModal.value = false;
  };

  return {
    verModal,
    mostrarModal,
    ocultarModal,
  };
};
