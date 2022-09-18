<template>
  <router-view/>
</template>

<style lang="scss">
.material-symbols-outlined {
  font-weight: 300;
}
html[data-theme="light"] {
     --background: #f8f9fa;
     --border: #000;
     --menuheader: #fff;
}

html[data-theme="dark"] {
    --background: #000;
    --border: #999;
    --menuheader: #ccc;
}
:root {
	--primary: #3b0266;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 200px;
  --white: #f1f5f9;
  --whiteHover: #ffffff0d;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
