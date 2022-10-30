<script>
import icons from '@/assets/icons/icons.js';
export default {
    name: 'icons',
    props: {
        icon: String
    },
    computed: {
        path() {
            return icons[this.icon][1];
        },
        vBox() {
            return icons[this.icon][0];
        }
    }
}
</script>

<template>
    <svg :viewBox="vBox">
        <path :d="path" />
    </svg>
</template>