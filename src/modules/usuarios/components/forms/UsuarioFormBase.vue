<template> 
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-x-5">
                        <article class="mb-4">
                            <p class="uppercase mb-1">nombre</p>
                            <NInput
                                v-model:value="usuario.nombre"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">apellido</p>
                            <NInput
                                v-model:value="usuario.apellido"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">correo</p>
                            <NInput
                                v-model:value="usuario.correo"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">perfil</p>
                            <NSelect
                                v-model:value="usuario.idPerfil"
                                :options="perfilesOpciones"
                                :disabled="edicionHabilitada"/>
                        </article>
                    </section>

                    <section v-if="esAdministrador || esSupervisor || esOperador">
                    <header class="mb-3">
                        <h3 class="uppercase font-bold">Datos especificos del puesto</h3>
                    </header>
                    <section class="grid grid-cols-2 lg:grid-cols-4 gap-x-5">
                        <article v-if="esOperador || esSupervisor || esAdministrador" class="mb-4">
                            <p class="uppercase mb-1">clientes</p>
                            <NSelect
                                v-model:value="usuario.idCliente"
                                :options="clientesOpciones"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article v-if="esOperador || esSupervisor" class="mb-4">
                            <p class="uppercase mb-1">sucursales</p>
                            <NSelect
                                v-model:value="usuario.idSucursal"
                                :options="sucursalesOpciones"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article v-if="esOperador" class="mb-4">
                            <p class="uppercase mb-1">areas</p>
                            <NSelect
                                v-model:value="usuario.idArea"
                                :options="areasOpciones"
                                :disabled="edicionHabilitada"/>
                        </article>
                    </section>
                </section>

                <section>
                    <header class="flex items-center gap-x-5 mb-3">
                        <h3 class="uppercase font-bold">Cambiar password</h3>
                        <NSwitch :disabled="edicionHabilitada" :round="false" v-model:value="editarPassword"/>
                    </header>
                    <section v-if="editarPassword"class="grid grid-cols-2 gap-x-5">
                        <article class="mb-4">
                            <p class="uppercase mb-1">password</p>
                            <NInput
                                v-model:value="usuario.password"
                                :disabled="edicionHabilitada"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">verificar password</p>
                            <NInput
                                v-model:value="verificarPassword"
                                :disabled="edicionHabilitada"/>
                        </article>
                    </section>
                </section>

</template>

<script setup>
import {ref, computed} from 'vue'
import {onMounted} from 'vue'
import {NInput, NSelect, NSwitch} from 'naive-ui';
import useUsuarios from '@/modules/usuarios/composables/useUsuarios'
import { PERFILES } from '../../utils/perfiles'
import usePerfiles from '@/modules/perfiles/composables/usePerfiles'
import useClientes from '@/modules/clientes/composables/useClientes'
import useAreas from '@/modules/areas/composables/useAreas'
import useSucursales from '@/modules/sucursales/composables/useSucursales';

const editarPassword = ref(false);
const verificarPassword = ref(null);
const esSuperUsuario = computed(() => usuario.value.idPerfil === PERFILES.SUPERUSUARIO);
const esAdministrador = computed(() => usuario.value.idPerfil === PERFILES.ADMINISTRADOR);
const esSupervisor = computed(() => usuario.value.idPerfil === PERFILES.SUPERVISOR);
const esOperador = computed(() => usuario.value.idPerfil === PERFILES.OPERADOR);

const {perfilesOpciones} = usePerfiles();
const {clientesOpciones} = useClientes();
const {areasOpciones} = useAreas();
const {sucursalesOpciones} = useSucursales();

const {usuario, edicionHabilitada} = useUsuarios();

</script>