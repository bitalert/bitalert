<template>
  <dialog class="mdl-dialog">
    <h2 class="mdl-dialog__title">
      About bit-alert
    </h2>
    <div class="mdl-dialog__content">
      <div>バグ報告はこちら<a href="https://github.com/bitalert/bitalert/issues">GitHub</a></div>
      <div>Copyright © 2017 bit-alert.info All Rights Reserved</div>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button" @click="close">閉じる</button>
    </div>
  </dialog>
</template>

<script>
import dialogPolyfill from 'dialog-polyfill'
export default {
  mounted () {
    if (!this.$el.showModal) {
      dialogPolyfill.registerDialog(this.$el)
    }
  },
  methods: {
    show () {
      this.$el.showModal()
    },
    close () {
      console.log('close')
      this.$el.close()
    }
  }
}
</script>