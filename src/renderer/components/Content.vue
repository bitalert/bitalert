<template>
    <main class="mdl-components__pages">
      <!-- coin content -->
      <section class="mdl-components__page" :class="{'is-active': active}">
          <div class="mdl-grid mdl-grid--no-spacing ">
              <card v-for="data in list" :key="data.name" :coin="data"></card>
          </div>
      </section>
      <alert-content></alert-content>
      <alert-dialog ref="alert"></alert-dialog>
      <div ref="snack" class="mdl-js-snackbar mdl-snackbar">
        <div class="mdl-snackbar__text">
        </div>
        <button class="mdl-snackbar__action" type="button">
        </button>
      </div>

    </main>

</template>

<script>
import Card from './CoinCard'
import AlertConfig from './AlertConfig'
import AlertDialog from './AlertDialog'
import {getTick, getTime} from '../api'
import Tick from '../models/Tick'
import CoinCard from '../models/CoinCard'
import coins from '../coins'
import companies from '../companies'

export default {
  props: {
    type: ''
  },
  data () {
    return {
      coin: {},
      list: [],
      loading: true,
      disconnected: false,
      active: false,
      time: 0
    }
  },
  mounted () {
    console.log('created')
    var self = this
    this.routed()
    this.setData()
    setTimeout(() => {
      componentHandler.upgradeElement(self.$refs.snack)
    }, 100)
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log('beforeRouteEnter')
  //   next(vm => vm.setData())
  // },
  watch: {
    // call again the method if the route changes
    '$route': 'routed'
  },
  methods: {
    showSnack () {
      var handler = (event) => {
        window.location.reload()
      }
      this.$refs.snack.MaterialSnackbar.showSnackbar({
        message: '接続できませんでした',
        timeout: 200000,
        actionHandler: handler,
        actionText: 'リロード'
      })
    },
    routed () {
      console.log('this.$route.name ' + this.$route.name)
      this.active = this.$route.name === 'coin'
      this.setData()
    },
    setData () {
      console.log('setData:' + this.$route.params.coin)
      let found = false
      let coin
      for (let i = 0; i < coins.length; i++) {
        if (coins[i].short === this.$route.params.coin) {
          coin = coins[i]
          found = true
          break
        }
      }
      if (!found) {
        coin = coins[0] // maybe bitcoin
      }

      let list = []
      for (let i = 0; i < coin.companies.length; i++) {
        if (companies[coin.companies[i]]) {
          list.push(new CoinCard(companies[coin.companies[i]]))
        }
      }
      this.coin = coin
      this.list = list
      this.startTick()
    },
    showAlert (messages, notifications, enableSound) {
      this.$refs.alert.showMessage(messages, notifications, enableSound)
    },
    startTick () {
      console.log('startTick')
      let self = this
      getTime().then((response) => {
        self.time = Math.floor(response.data.now / 1000) * 1000
        self.$store.dispatch('ticker/startTimer', self.getTick)
      }).catch((err) => {
        self.showSnack()
        console.log(err)
      })
    },
    getTick () {
      console.log('tick')
      // とりあえず加算
      this.time += 1000
      if (this.$route.name !== 'coin') {
        return
      }
      // TODO: tickは通貨ごとではなくまとめる
      let self = this
      let now = this.time
      let getCoinFunc = getTick
      let coin = this.$route.params.coin
      return getCoinFunc(now)
        .then((response) => {
          // let json = JSON.parse(response.data) || []
          // ticker.failCount = 0
          self.$store.dispatch('ticker/resetFailCount')
          for (let i = 0; i < self.list.length; i++) {
            self.list[i].resetTick()
          }
          let ticks = []
          for (var key in response.data) {
            response.data[key].forEach((val) => {
              let tick = new Tick(val)
              tick.coin = key
              if (key === coin) {
                for (let i = 0; i < self.list.length; i++) {
                  if (tick.name === self.list[i].name) {
                    self.list[i].setTick(tick)
                    break
                  }
                }
              }
              ticks.push(tick)
            })
          }
          /// checkTick
          console.log('check alert')
          if (self.$store.state.alert.alerts) {
            let alerts = self.$store.state.alert.alerts
            let check = false
            let messages = []
            let notification = []
            let matched = []
            let notMatched = []
            let sound = false
            for (let i = 0; i < alerts.length; i++) {
              let ret = alerts[i].checkAlert(ticks)
              if (ret) {
                matched.push(alerts[i])
                if (!alerts[i].continuous) {
                  sound = sound || alerts[i].enableSound
                  check = check || ret
                  messages.push(alerts[i].toString())
                  if (alerts[i].enableNotification) {
                    notification.push(alerts[i].toString())
                  }
                }
              } else {
                notMatched.push(alerts[i])
              }
            }
            if (check) {
              // self.showAlert(message, notification, sound)
              self.$refs.showMessages(messages, notification, sound)
            }
            self.$store.dispatch('alert/setAlertContinuous', matched, notMatched)
          }
        })
        .catch((error) => {
          // reject(err)
          self.$store.dispatch('ticker/incrFailCount')
          if (self.$store.state.tick.failCount > 15) {
            self.disconnected = true
            self.$store.dispatch('ticker/stopTimer')
            self.showSnack()
          }
          console.log(error)
        })
    }
  },
  components: {
    Card,
    AlertContent: AlertConfig,
    AlertDialog
  }
}
</script>

<style>
code[class*="language-"],pre[class*="language-"] {
 color:#000;
 text-shadow:0 1px #fff;
 font-family:Consolas,Monaco,'Andale Mono',monospace;
 direction:ltr;
 text-align:left;
 white-space:pre;
 word-spacing:normal;
 word-break:normal;
 line-height:1.5;
 -moz-tab-size:4;
 tab-size:4;
 -webkit-hyphens:none;
 -moz-hyphens:none;
 -ms-hyphens:none;
 hyphens:none
}
pre[class*="language-"]::-moz-selection,pre[class*="language-"] ::-moz-selection,code[class*="language-"]::-moz-selection,code[class*="language-"] ::-moz-selection {
 text-shadow:none;
 background:#b3d4fc
}
pre[class*="language-"]::selection,pre[class*="language-"] ::selection,code[class*="language-"]::selection,code[class*="language-"] ::selection {
 text-shadow:none;
 background:#b3d4fc
}
@media print {
 code[class*="language-"],pre[class*="language-"] {
  text-shadow:none
 }
}
pre[class*="language-"] {
 padding:1em;
 margin:.5em 0;
 overflow:auto
}
:not(pre)>code[class*="language-"],pre[class*="language-"] {
 background:#f5f2f0
}
:not(pre)>code[class*="language-"] {
 padding:.1em;
 border-radius:.3em
}
.token.comment,.token.prolog,.token.doctype,.token.cdata {
 color:slategray
}
.token.punctuation {
 color:#999
}
.namespace {
 opacity:.7
}
.token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted {
 color:#905
}
.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.inserted {
 color:#690
}
.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string {
 color:#a67f59;
 background:hsla(0,0%,100%,.5)
}
.token.atrule,.token.attr-value,.token.keyword {
 color:#07a
}
.token.function {
 color:#DD4A68
}
.token.regex,.token.important,.token.variable {
 color:#e90
}
.token.important,.token.bold {
 font-weight:700
}
.token.italic {
 font-style:italic
}
</style>