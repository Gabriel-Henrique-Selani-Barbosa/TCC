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
import logoURL from '@/assets/logo.jpg'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>

aside {
	display: flex;
	flex-direction: column;
	color: var(--light);
	width: calc(2rem + 32px);
	overflow: hidden;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

    .divider {
        position: relative;
        z-index: 10;
        height: 1px;
        width: 100%;
        background-color: #ffffff14;
        margin: 1.5rem 0;
    }

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-symbols-outlined {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-symbols-outlined {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;
        display: flex;
        flex-direction: column;
        row-gap: 5px;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-symbols-outlined {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--whiteHover);
                border-radius: 50px 0 0 50px;

				.material-symbols-outlined, .text {
					color: var(--white);
				}
			}

			&.router-link-exact-active {
				background-color: var(--white);
				border-radius: 50px 0 0 50px;
                position: relative;
                &:before {
                    content: "";
                    width: 45px;
                    height: 45px;
                    transform: rotate(90deg) scale(1.04);
                    background-size: 100%;
                    background-image: url(@/assets/radius-bottom.svg);
                    position: absolute;
                    top: -45px;
                    right: 0px;
                }
                &:after {
                    content: "";
                    width: 45px;
                    height: 45px;
                    transform: scale(1.04);
                    background-size: 100%;
                    background-image: url(@/assets/radius-bottom.svg);
                    position: absolute;
                    top: 100%;
                    right: 0px;
                }

				.material-symbols-outlined, .text {
					color: var(--primary);
				}

                .text {
                    font-weight: 600;
                }
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			.material-symbols-outlined {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>