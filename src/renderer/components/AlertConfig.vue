<template>
  <!-- 一覧 -->
  <section class="mdl-components__page" :class="{'is-active': active}">
    <div class="mdl-grid">
      <!-- 追加ボタン -->
      <div class="mdl-cell mdl-cell--12-col alert-outline">
      <button @click="add" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
        <i class="material-icons">add</i>
      </button>
      </div>
        <!--<card v-for="data in list" :key="data.name" :coin="data"></card>-->  

      <row v-for="row in $store.state.alert.alerts" :key="row.id" :alert="row"></row>

    </div>
    <div ref="snack" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text">
      </div>
      <button class="mdl-snackbar__action" type="button">
      </button>
    </div>
  </section>
</template>

<script>
import coins from '../coins'
import companies from '../companies'
import AlertConfigRow from './AlertConfigRow'
export default {
  computed: {
  },
  data () {
    return {
      active: false,
      coins: coins,
      compnies: companies
    }
  },
  components: {
    Row: AlertConfigRow
  },
  mounted () {
    this.active = this.$route.name === 'alert'
  },
  methods: {
    showSnack (message) {
      this.$refs.snack.MaterialSnackbar.showSnackbar({
        message: message
      })
    },
    add () {
      this.$store.dispatch('alert/createAlert')
    },
    routed () {
      this.active = this.$route.name === 'alert'
    }
  },
  watch: {
    '$route': 'routed'
  }
}
</script>

<style>

  .alert-outline {
    border-color: #e1e8ed;
    border-radius: 0.42857em;
    border-style: solid;
    border-width: 1px;
    padding: 5px;
  }

  .alert-button {
    float:right;
  }
</style>