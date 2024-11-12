<template>
    <section class="w-full h-full flex justify-center items-center">
        <section class="w-full flex flex-col items-center">
            <img :src="imgPromev" alt="promev" class="w-56">
            <AuthFormLogin/>
        </section>
    </section>
</template>

<script setup>
import imgPromev from '@/assets/img/Promev.png'
import { defineAsyncComponent } from 'vue'

//Componentes
const AuthFormLogin = defineAsyncComponent(() => import('@/modules/auth/components/forms/AuthFormLogin.vue'));
</script>
