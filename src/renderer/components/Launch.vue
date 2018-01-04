<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link :to="{name: 'alert'}" class="mdl-components__link mdl-component badges">
        <div class="mdl-components__link-image" style="text-align: center;">
            <i class="material-icons">&#xE7F4;</i>
        </div>
        <span class="mdl-components__link-text">アラート</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
