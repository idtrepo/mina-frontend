<template>
<section class="pt-3 grid grid-cols-2 gap-x-5">
                <article class="mb-4 col-span-2">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput clearable v-model:value="filtros.nombre"/>
                </article>
                <article class="mb-4 col-span-2">
                    <p class="uppercase mb-1">apellido</p>
                    <NInput clearable v-model:value="filtros.apellido"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">correo</p>
                    <NInput clearable v-model:value="filtros.correo"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">fecha</p>
                    <NDatePicker clearable v-model:value="filtros.fecha"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">perfil</p>
                    <NSelect clearable v-model:value="filtros.perfil" :options="perfilesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect clearable v-model:value="filtros.cliente" :options="clientesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">sucursal</p>
                    <NSelect clearable v-model:value="filtros.sucursal" :options="sucursalesOpciones"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">area</p>
                    <NSelect clearable v-model:value="filtros.area" :options="areasOpciones"/>
                </article>
                <article>
                    <p class="uppercase mb-1">estatus</p>
                    <NSwitch v-model:value="filtros.estatus"/>
                </article>
            </section>
</template>

<script setup>
import { NDatePicker, NSwitch, NSelect, NInput } from 'naive-ui'
import useUsuarios from '@/modules/usuarios/composables/useUsuarios';
import useAreas from '@/modules/areas/composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';

const {filtros} = useUsuarios();
const {areasOpciones} = useAreas();
const {sucursalesOpciones} = useSucursales();
const {clientesOpciones} = useClientes();
const {perfilesOpciones} = usePerfiles();
</script>