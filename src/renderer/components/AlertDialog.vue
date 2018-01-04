<template>

  <dialog class="mdl-dialog">
    <h2 class="mdl-dialog__title">
      <i class="material-icons">&#xE7F4;</i>アラート
    </h2>
    <div class="mdl-dialog__content">
      <ul>
        <li v-for="message in messages">{{message}}</li>
      </ul>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button" @click="close">閉じる</button>
    </div>
    <audio id="config-audio" ref="audio1" v-bind:src="testWav" preload="auto" loop="1"></audio>
    
  </dialog>
</template>

<script>
import testWav from '../assets/audio/test.mp3'
import notification from '../utils/notification'
import dialogPolyfill from 'dialog-polyfill'
export default {
  data () {
    return {
      testWav,
      playing: false,
      shown: false,
      messages: []
    }
  },
  mounted () {
    if (!this.$el.showModal) {
      dialogPolyfill.registerDialog(this.$el)
    }
  },
  methods: {
    play: function () {
      if (!this.playing) {
        this.$refs.audio1.play()
        this.playing = true
      }
    },
    stop: function () {
      this.$refs.audio1.pause()
      this.playing = false
    },
    showMessages (messages, notifications, sound) {
      if (sound) {
        this.play()
      }

      if (this.messages.length > 0) {
        for (let i = 0; i < this.messages.length; i++) {
          let count = messages
          while (count--) {
            if (messages[count].equals(this.messages[i])) {
              messages.splice(count, 1)
            }
          }
        }
        this.messages.concat(messages)
      } else {
        this.messages = messages
      }

      if (!this.shown) {
        this.shown = true
        this.$el.showModal()
      }

      if (notifications && notifications.length > 0) {
        notification.notify(notifications.join('\n'))
      }
    },
    close () {
      console.log('close')
      this.shown = false
      this.$el.close()
      this.stop()
      while (this.messages.length > 0) {
        this.messages.pop()
      }
    }
  }
}
</script>

<style>
  .mdl-dialog {
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    width: 400px;
  }
</style>