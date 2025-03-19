import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('usuarios-store', () => {
    const usuario = ref({
        nombre: null,
        apellido: null,
        correo: null,
        idCliente: null,
        idArea: null,
        idPerfil: null,
        idSucursal: null
    });

    const usuarios = ref([]);
    const numeroElementos = ref(1);

    const asignarDataUsuarios = ({data, resultados}) => {
        usuarios.value = data;
        numeroElementos.value = resultados;
    };

    const asignarDataUsuario = (data) => {
        const {id, nombre, apellido, correo, cliente, area, perfil, sucursal} = data;
        usuario.value["id"] = id;
        usuario.value.nombre = nombre;
        usuario.value.apellido = apellido;
        usuario.value.correo = correo;
        usuario.value.idCliente = cliente?.id ?? null;
        usuario.value.idArea = area?.id ?? null;
        usuario.value.idPerfil = perfil?.id ?? null;
        usuario.value.idSucursal = sucursal?.id ?? null;
    };

    return {
        usuario,
        usuarios,
        numeroElementos,
        asignarDataUsuarios,
        asignarDataUsuario
    };
})
