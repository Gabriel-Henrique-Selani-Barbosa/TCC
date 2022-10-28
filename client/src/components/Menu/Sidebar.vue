<template>
	<div class="menu">
		<aside>
			<div class="logo">
				<a href='https://br.freepik.com/fotos-vetores-gratis/logo-pessoal'><img alt="Logo pessoal vetor criado por freepik - br.freepik.com"/></a>
			</div>

			<div class="divider"></div>
			<ul class="menu__list">
				<li>
					<router-link to="/home" class="button">
						<span class="material-symbols-outlined">home</span>
						<span class="text">Home</span>
					</router-link>
				</li>
				<li>
					<router-link to="/clientes" class="button">
						<span class="material-symbols-outlined">person</span>
						<span class="text">Clientes</span>
					</router-link>
				</li>
				<li>
					<router-link to="/fornecedores" class="button">
						<span class="material-symbols-outlined">email</span>
						<span class="text">Fornecedores</span>
					</router-link>
				</li>
				<li>
					<router-link to="/Equipamentos" class="button">
						<span class="material-symbols-outlined">settings</span>
						<span class="text">Equipamentos</span>
					</router-link>
				</li>
				<li>
					<router-link to="/Pedidos" class="button">
						<span class="material-symbols-outlined">currency_exchange</span>
						<span class="text">Pedidos</span>
					</router-link>
				</li>
			</ul>
		</aside>
	</div>
</template>

