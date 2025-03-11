import {ref, computed} from 'vue';
import {defineStore} from 'pinia';

export default defineStore('usuario-store', () =>{
    const usuario = ref(null);
    const usuarioRegistrado = computed(() => !!usuario.value);
    const usuarioNombre = computed(() => usuario.value?.nombre);
    const usuarioApellido = computed(() => usuario.value?.apellido);
    const usuarioNombreCompleto = computed(
    () => `${usuarioNombre.value} ${usuarioApellido.value}`
  );
    const usuarioPermisos = computed(() => usuario.value?.perfil?.acciones);
    const usuarioPerfil = computed(() => usuario.value?.perfil?.nombre);
    const usuarioSucursal = computed(() => usuario.value?.sucursal?.id);
    const usuarioSucursalNombre = computed(() => usuario.value?.sucursal?.nombre);
    const usuarioCliente = computed(() => usuario.value?.cliente?.id);
    const usuarioClienteNombre = computed(() => usuario.value?.cliente?.nombre);
    const usuarioPerfilId = computed(() =>  usuario.value?.perfil?.id);

    const asignarDatosUsuario = (data) => (usuario.value = data);

    return {
      usuarioRegistrado,
      usuarioNombre,
      usuarioApellido,
      usuarioNombreCompleto,
      usuarioPerfil,
      usuarioSucursal,
      usuarioSucursalNombre,
      usuarioCliente,
      usuarioClienteNombre,
      usuarioPermisos,
      usuarioPerfilId,
      asignarDatosUsuario,
    };
})