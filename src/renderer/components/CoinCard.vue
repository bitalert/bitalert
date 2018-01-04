<template>
  <div class="coin-card mdl-cell mdl-cell--4-col-desktop mdl-cell--6-col-tablet mdl-cell--12-col-phone mdl-card mdl-shadow--2dp"
  :class="{'mdl-color--red-300': coin.color == 'red', 'mdl-color--cyan-300': coin.color == 'green'}"
  @click="onClick()">

    <div v-if="coin.reset" class="mdl-card_title-tick">
      <span class="mdl-card__title-text" style="font-size: 18px">
        Tickerに対応していません
      </span>
    </div>
    <div v-else class="mdl-card_title-tick">
      <h2 class="mdl-card__title-text">
      ask:
      </h2>
      <h2 class="mdl-card__title-text">
        {{coin.tick? coin.tick.ask : ''}}
      </h2>
      <h2 class="mdl-card__title-text">
      bid:
      </h2>
      <h2 class="mdl-card__title-text">
        {{coin.tick? coin.tick.bid : ''}}
      </h2>
    </div>
    <div class="mdl-card__actions">
      <span class="demo-card-image__filename">
        {{coin.dispName}}
      </span>
    </div>
  </div>
</template>


<script>
import Card from '../models/CoinCard'

export default {
  props: {
    coin: {
      type: Object,
      default () {
        return new Card()
      }
    }
  },
  data () {
    return {
      colorTick: 0
    }
  },
  methods: {
    onClick () {
      if (this.coin.url) {
        window.open(this.coin.url, '_blank')
      }
    },
    resetColor () {
      this.coin.color = 'none'
      this.colorTick = 0
    }
  },
  watch: {
    'coin.color': function (val) {
      if (val && val !== 'none') {
        if (this.colorTick) {
          clearTimeout(this.colorTick)
        }
        var self = this
        this.colorTick = setTimeout(() => {
          self.coin.color = 'none'
          self.colorTick = 0
        }, 3000)
      }
    }
  }
}
</script>

<style>
.coin-card {
cursor: pointer;
}

.mdl-card_title-tick {
    -ms-flex-align: center;
    /* align-items: center; */
    /* color: #000; */
    display: block;
    /* display: -webkit-flex; */
    display: -ms-flexbox;
    /* display: flex; */
    -webkit-justify-content: stretch;
    -ms-flex-pack: stretch;
    /* justify-content: stretch; */
    line-height: normal;
    padding: 16px;
    -webkit-perspective-origin: 165px 56px;
    perspective-origin: 165px 56px;
    -webkit-transform-origin: 165px 56px;
    transform-origin: 165px 56px;
    box-sizing: border-box;
}
</style>
