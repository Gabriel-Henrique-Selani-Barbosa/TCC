<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
            <a href='https://br.freepik.com/fotos-vetores-gratis/logo-pessoal'><img :src="logoURL" alt="Logo pessoal vetor criado por freepik - br.freepik.com"/></a>
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-symbols-outlined">keyboard_double_arrow_right</span>
			</button>
		</div>

        <div class="divider"></div>
		<div class="menu">
			<router-link to="/home" class="button">
				<span class="material-symbols-outlined">home</span>
				<span class="text">Home</span>
			</router-link>
			<router-link to="/clientes" class="button">
				<span class="material-symbols-outlined">groups</span>
				<span class="text">Clientes</span>
			</router-link>
			<router-link to="/contact" class="button">
				<span class="material-symbols-outlined">email</span>
				<span class="text">Contact</span>
			</router-link>
            <router-link to="/settings" class="button">
				<span class="material-symbols-outlined">settings</span>
				<span class="text">Settings</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '@/assets/img/logo.jpg'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>