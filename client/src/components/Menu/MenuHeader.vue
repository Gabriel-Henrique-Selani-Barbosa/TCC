<template>
    <div class="menu-header">
        <button @click="toggleMenu"><span class="material-symbols-outlined">menu</span></button>
    </div>
</template>
<script>
    export default {
        name: 'Menu',
        methods: {
            toggleMenu() {
                document.querySelector('body').classList.toggle('nav-open')
            }
        }
    }
    </script>