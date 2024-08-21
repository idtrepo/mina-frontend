<template>
    <article class="w-1/3 px-7 py-5 bg-blue-950/60 rounded-lg shadow-gray-100/30 shadow-sm">
        <header class="mb-5">
            <h3 class="text-center font-bold uppercase text-gray-100">Inicio de sesion</h3>
        </header>
        <section class="mb-7">
            <article class="mb-3">
                <p class="mb-2 uppercase text-slate-300">correo</p>
                <NInput 
                    v-model:value="credenciales.correo" 
                    :placeholder="AUTH_PLACEHOLDER.CORREO" 
                    type="text"/>
            </article>
            <article>
                <p class="mb-2 uppercase text-slate-300">password</p>
                <NInput 
                    v-model:value="credenciales.password" 
                    :placeholder="AUTH_PLACEHOLDER.PASSWORD" 
                    type="password"/>
            </article>
        </section>
        <footer>
            <NButton 
                @click="iniciarSesion"
                type="info" 
                class="w-full">
                Iniciar sesion
            </NButton>
        </footer>
    </article>
</template>

<script setup>
import { inject } from 'vue'
import { NButton, NInput } from 'naive-ui'
import { AUTH_PLACEHOLDER } from '@/modules/global/utils/placeholder'

const { credenciales, iniciarSesion } = inject('auth-login')
</script>