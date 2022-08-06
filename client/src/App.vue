<template>
  <router-view/>
</template>

<style lang="scss">
body {
  background: #3b0266;
  padding: .75rem 2rem !important;
  overflow-y: auto;
  height: calc(100vh - 1.50rem) !important;
}
.material-symbols-outlined {
  font-weight: 300;
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
}
.content {
    border-radius: 30px;
    padding: 0 22px;
    min-height: calc(100vh - 1.50rem);
    min-width: 0px;
    flex: 1 1 0%;
    --tw-bg-opacity: 1;
    background: #f1f5f9;
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
