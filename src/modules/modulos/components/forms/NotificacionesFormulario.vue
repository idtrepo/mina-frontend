<template>
    <NCard class="md:max-h-2/3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Columna izquierda: entradas y pendientes -->
            <div class="space-y-6">
                <!-- Toggle de modo -->
                <NotificacionesModoToggle v-model="modo" />
                <!-- 1) Agregar correo manual a la cola -->
                <NotificacionesEntradaManual v-if="modo === 'manual'" v-model="correoManual"
                    @agregar="agregarCorreoManual" />

                <!-- 2) Seleccionar usuarios y agregarlos a la cola -->
                <NotificacionesEntradaUsuarios v-if="modo === 'usuarios'" v-model="usuariosSeleccionados"
                    :options="usuariosOpcionesFiltradas" />

                <!-- 3) Lista de pendientes -->
                <section v-if="pendientes.length > 0" class="space-y-3">
                    <div class="text-sm">Pendientes: {{ pendientes.length }}</div>
                    <div class="space-y-2 max-h-48 overflow-y-auto border rounded p-3">
                        <div v-for="(item, idx) in pendientes" :key="item.key"
                            class="flex items-center justify-between text-sm bg-slate-800 px-3 py-2 rounded">
                            <div class="truncate">
                                <span class="text-slate-100" v-if="item.correo"> {{ item.correo }}</span>
                                <span class="text-slate-100" v-else>Usuario ID: {{ item.usuario.id }}</span>
                            </div>
                            <NButton size="small" type="warning" quaternary @click="eliminarPendiente(idx)">Quitar</NButton>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <NButton type="tertiary" @click="limpiarPendientes">Limpiar lista</NButton>
                        <NButton type="primary" :loading="procesando" @click="procesarPendientes">Guardar pendientes
                        </NButton>
                    </div>
                    <div v-if="procesando" class="text-xs text-slate-400">
                        Guardando {{ progresoActual }}/{{ pendientes.length }}...
                    </div>
                </section>
            </div>

            <!-- Columna derecha: correos existentes en BD -->
            <NotificacionesCorreosLista :correos="correos" :eliminando-id="eliminandoId"
                @eliminar="handleEliminarCorreo" />
        </div>
    </NCard>

</template>

<script setup>
import { NButton, NCard } from 'naive-ui';
import { onMounted, ref, computed, watch } from 'vue';
import NotificacionesModoToggle from './NotificacionesModoToggle.vue';
import NotificacionesEntradaManual from './NotificacionesEntradaManual.vue';
import NotificacionesEntradaUsuarios from './NotificacionesEntradaUsuarios.vue';
import NotificacionesCorreosLista from './NotificacionesCorreosLista.vue';

// Composables
import useCorreos from '@/modules/correos/composables/useCorreos';
import useUsuarios from '@/modules/usuarios/composables/useUsuarios';
import useUsuarioStore from '@/modules/auth/stores/useUsuarioStore';

// Correos
const { crearCorreo, obtenerCorreos, correos, eliminarCorreo } = useCorreos();

// Usuarios
const { obtenerUsuarios, usuarios } = useUsuarios();

// Estado local
const correoManual = ref('');
const usuariosSeleccionados = ref([]); // array de IDs de usuario
const modo = ref('manual'); // 'manual' | 'usuarios'

// idCliente desde el usuario activo;
const usuarioStore = useUsuarioStore();
const idClientePlaceholder = 1;
const idClienteActual = computed(() => usuarioStore.usuarioCliente ?? idClientePlaceholder);

// Cola de pendientes a guardar secuencialmente
// item: { key: string, correo?: string, usuario.id?: number, idCliente: number }
const pendientes = ref([]);
const procesando = ref(false);
const progresoActual = ref(0);
const eliminandoId = ref(null);

// Snapshot inicial de usuarios para no perderlos al filtrar
const usuariosOriginales = ref([]);
// Opciones filtradas (excluye correos ya registrados)
const usuariosOpcionesFiltradas = computed(() => {
    const base = usuariosOriginales.value.length ? usuariosOriginales.value : usuarios.value;
    return base
        .filter(u => !correos.value?.some(c => c.correo === u.correo))
        .map(u => ({ label: u.correo || `Usuario ${u.id}`, value: u.id }));
});

// Helpers de cola: prioriza usuario.id si existe; si no, correo
const makeKey = (item) => (item?.usuario && item.usuario.id != null)
    ? `usuario:${item.usuario.id}`
    : `correo:${item.correo}`;

const existeEnPendientes = (nuevo) => {
    const key = makeKey(nuevo);
    return pendientes.value.some((i) => i.key === key);
};

const agregarCorreoManual = () => {
    const correo = (correoManual.value || '').trim();
    if (!correo) return;

    const item = {
        key: makeKey({ correo }),
        correo,
        idCliente: idClienteActual.value,
    };

    if (existeEnPendientes(item)) {
        console.warn('Correo ya está en la lista:', correo);
        return;
    }

    pendientes.value.push(item);
    correoManual.value = '';
};

const obtenerUsuarioPorId = (id) => (usuariosOriginales.value.length ? usuariosOriginales.value : usuarios.value).find(u => u.id === id);

const syncPendientesConSeleccion = (ids) => {
    const seleccionIds = Array.isArray(ids) ? ids : [];
    // Quitar pendientes de usuarios que ya no están seleccionados
    pendientes.value = pendientes.value.filter((p) => !(p.usuario && !seleccionIds.includes(p.usuario.id)));
    // Agregar pendientes para usuarios seleccionados que aún no estén en la lista
    seleccionIds.forEach((id) => {
        const usuario = obtenerUsuarioPorId(id);
        const item = {
            key: makeKey({ usuario: { id } }),
            usuario: { id },
            idCliente: idClienteActual.value,
            correo: usuario?.correo ?? '',
        };
        if (!existeEnPendientes(item)) {
            pendientes.value.push(item);
        }
    });
};

const eliminarPendiente = (idx) => {
    const item = pendientes.value[idx];
    if (!item) return;
    pendientes.value.splice(idx, 1);
    // Si era un usuario seleccionado, quitar también su id del select
    if (item.usuario?.id) {
        usuariosSeleccionados.value = usuariosSeleccionados.value.filter(id => id !== item.usuario.id);
    }
};

const limpiarPendientes = () => {
    pendientes.value = [];
    // limpiar también la selección del select
    usuariosSeleccionados.value = [];
};

// Confirmar y eliminar correo existente
const handleEliminarCorreo = async (id) => {
    if (eliminandoId.value) return; // evitar doble clic
    const confirmar = window.confirm('¿Seguro que deseas eliminar este correo?');
    if (!confirmar) return;
    try {
        eliminandoId.value = id;
        await eliminarCorreo(id);
        await obtenerCorreos();
    } catch (e) {
        console.error('Error eliminando correo', e);
    } finally {
        eliminandoId.value = null;
    }
};

// Proceso secuencial de guardado
const procesarPendientes = async () => {
    if (procesando.value || pendientes.value.length === 0) return;

    procesando.value = true;
    progresoActual.value = 0;

    const resultados = [];
    for (let i = 0; i < pendientes.value.length; i++) {
        const item = pendientes.value[i];
        const payload = item.usuario
            ? { idCliente: item.idCliente, usuario: { id: item.usuario.id }, correo: item.correo }
            : { correo: item.correo, idCliente: item.idCliente };

        try {
            const res = await crearCorreo(payload);
            resultados.push({ ok: !!res, res, item });
            if (!res) console.error('Fallo al crear correo para item:', item);
        } catch (err) {
            console.error('Error en crearCorreo:', err);
            resultados.push({ ok: false, error: err, item });
        }
        progresoActual.value = i + 1;
        // pausita
        await new Promise((r) => setTimeout(r, 120));
    }

    const ok = resultados.filter(r => r.ok).length;
    const fail = resultados.length - ok;

    // refrescar listado si existe endpoint
    try { await obtenerCorreos(); } catch { }

    // limpiar sólo los que salieron bien
    const exitosKeys = new Set(resultados.filter(r => r.ok).map(r => r.item.key));
    pendientes.value = pendientes.value.filter((p) => !exitosKeys.has(p.key));
    procesando.value = false;
    usuariosSeleccionados.value = [];
};

// Ciclo de vida
onMounted(async () => {
    try {
        await obtenerUsuarios({ params: { listado: true } });
        if (!usuariosOriginales.value.length) {
            usuariosOriginales.value = [...usuarios.value];
        }
    } catch (e) {
        console.error('Error cargando usuarios', e);
    }
    try {
        await obtenerCorreos();
    } catch (e) {
        console.error('Error cargando correos', e);
    }
});

// Limpiar inputs del modo inactivo cuando cambie
watch(modo, (nuevo) => {
  if (nuevo === 'usuarios') {
        correoManual.value = '';
    }
});

// hook pa mantener la cola sincronizada con la selección del select de usuarios
watch(usuariosSeleccionados, (ids) => {
    if (modo.value !== 'usuarios') return;
    syncPendientesConSeleccion(ids);
}, { deep: true });
</script>