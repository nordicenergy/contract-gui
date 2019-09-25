<template>
    <div id="app" class="flex bg-lition-background">
        <nav class="h-screen bg-lition-black text-md" style="min-width: 300px">
            <div class="flex items-center pl-8 bg-lition-black-nav">
                <img src="lition-logo.png" alt="Lition Logo">
            </div>
            <ul class="mt-4 text-white ml-8">
              <li>{{ $t('nav.register_new_chain') }}</li>
              <li class="mt-2">{{ $t('nav.interact_with_chain') }}</li>
            </ul>
            <div class="w-full mt-4" style="background-color: #1A263C; height: 0.2rem"></div>
        </nav>
        <main class="flex w-full items-center justify-center">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>

</script>

<!--<style lang="less">-->
<!--#app {-->
<!--  font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->
<!--#nav {-->
<!--  padding: 30px;-->
<!--  a {-->
<!--    font-weight: bold;-->
<!--    color: #2c3e50;-->
<!--    &.router-link-exact-active {-->
<!--      color: #42b983;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
