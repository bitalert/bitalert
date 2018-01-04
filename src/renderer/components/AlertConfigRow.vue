<template>
  <div class="alert-outline mdl-cell mdl-cell--12-col mdl-grid">
    <div ref="name" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col form-group"
    :class="{'form-group--error': $v.alert.name.$error, 'is-invalid': $v.alert.name.$error}">
      <label class="mdl-textfield__label">アラーム名</label>
      <input class="mdl-textfield__input" maxlength="255" type="text" v-model.trim="alert.name"
      @input="$v.alert.name.$touch();onInput('name')">
      <span class="mdl-textfield__error form-group__message">入力してください</span>
    </div>

    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-cell mdl-cell--12-col">
      <input type="checkbox" v-model="alert.enable" class="mdl-switch__input">
      <span class="mdl-switch__label">有効</span>
    </label>

    <div class="mdl-cell mdl-cell--12-col">
      <div ref="coin"
      class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
      :class="{'is-invalid': $v.alert.coin.$error}">
        <label class="mdl-textfield__label">コイン</label>
        <select class="mdl-textfield__input" v-model="alert.coin" @change="$v.alert.coin.$touch();onInput('coin')">
          <option v-for="coin in coins" :value="coin.short">{{coin.dispName}}</option>
        </select>
      </div>
    </div>

    
    <div v-show="isCoinSelected()" class="mdl-cell mdl-cell--6-col mdl-cell--12-col-phone">
      <div ref="object1" 
      class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
      :class="{'is-invalid': ($v.alert.object1.$error || $v.alert.object1Value.$error || customValid1), 'form-group--error': $v.alert.object1Value.$error, }">
        <label class="mdl-textfield__label">対象１</label>
        <!-- companies -->
        <select class="mdl-textfield__input" v-model="alert.object1" @change="$v.alert.object1.$touch();onInput('object1')">
          <option v-for="val in object1List" :value="val.name">{{val.dispName}}</option>
        </select>

        <!-- ask or bid -->
        <select v-show="alert.object1 && alert.object1 !== 'none' && alert.object1 !== 'numeric'" 
        class="mdl-textfield__input" 
        v-model="alert.object1Value" @change="$v.alert.object1Value.$touch();onInput('object2')">
          <option value="ask">ask</option>
          <option value="bid">bid</option>
        </select>

        <input class="mdl-textfield__input" maxlength="255" type="text" v-show="alert.object1 && alert.object1 !== 'none' && alert.object1 === 'numeric'"　
        v-model="alert.object1Value" @input="$v.alert.object1Value.$touch();onInput('object1')">
        <span class="mdl-textfield__error form-group__message" v-show="alert.object1 && alert.object1 !== 'none' && alert.object1 === 'numeric'">数字を入力してください</span>
      </div>
    </div>

    <div v-show="isCoinSelected()" class="mdl-cell mdl-cell--6-col mdl-cell--12-col-phone">
      <div ref="object2" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
      :class="{'is-invalid': ($v.alert.object2.$error || $v.alert.object2Value.$error || customValid2), 'form-group--error': $v.alert.object2Value.$error, }">
        <label class="mdl-textfield__label">対象２
        </label>
        <select class="mdl-textfield__input" v-model="alert.object2" @change="$v.alert.object1.$touch();onInput('object2')">
          <option v-for="val in object2List" :value="val.name">{{val.dispName}}</option>
        </select>

        <!-- ask or bid -->
        <select v-show="alert.object2 && alert.object2 !== 'none' && alert.object2 !== 'numeric'" class="mdl-textfield__input" 
        v-model="alert.object2Value"  
        @change="$v.alert.object2Value.$touch();onInput('object2')">
          <option value="ask">ask</option>
          <option value="bid">bid</option>
        </select>

        <input class="mdl-textfield__input" maxlength="255" type="text" 
        v-show="alert.object2 && alert.object2 !== 'none' && alert.object2 === 'numeric'" 
        v-model="alert.object2Value"
        @input="$v.alert.object2Value.$touch();onInput('object2')">

        <span class="mdl-textfield__error form-group__message" 
        v-show="alert.object2 && alert.object2 !== 'none' && alert.object2 === 'numeric'" >数字を入力してください</span>
      </div>
    </div>


    <div v-show="isCoinSelected()" class="mdl-cell mdl-cell--6-col mdl-cell--12-col-phone">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
      <label class="mdl-textfield__label">動作</label>
      <select class="mdl-textfield__input" v-model="alert.action">
        <option value="0">選択してください</option>
        <option value="1">対象１>=対象２</option>
        <option value="2">対象１>対象２</option>
        <option value="3">対象１<=対象２</option>
        <option value="4">対象１<対象２</option>
      </select>
    </div>
    </div>

    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-cell mdl-cell--12-col">
      <input type="checkbox" v-model="alert.enalbeSound" class="mdl-switch__input">
      <span class="mdl-switch__label">音声</span>
    </label>

    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-cell mdl-cell--12-col">
      <input type="checkbox" v-model="alert.enalbeNotification" class="mdl-switch__input">
      <span class="mdl-switch__label">デスクトップ通知</span>
    </label>

    <div class="mdl-cell mdl-cell--12-col form-spacer"></div>

    <div class="mdl-cell mdl-cell--12-col">
      <button @click="deleteAlert" class="mdl-button mdl-js-button mdl-button--raised">
        削除
      </button>
      <button @click="saveAlert" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" :disabled="$v.$invalid && !customValid1 && !customValid2">
        保存
      </button>
    </div>
  </div>
</template>

<script>
import Alert from '../models/Alert'
import coins from '../coins'
import companies from '../companies'
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    var coinList = []
    coinList.push({
      short: 'none',
      dispName: '選択してください'
    })
    for (let i = 0; i < coins.length; i++) {
      coinList.push(coins[i])
    }
    return {
      coins: coinList,
      companies: companies,
      changedTimeout: null
    }
  },
  mounted () {
    setTimeout(() => {
      componentHandler.upgradeDom()
    }, 100)
  },
  props: {
    alert: {
      default () {
        return new Alert()
      },
      type: Object
    }
  },
  computed: {
    object1List () {
      let coin = this.getCoin(this.alert.coin)
      if (coin) {
        let compList = []
        compList.push({
          name: 'none',
          dispName: '選択してください'
        })
        compList.push({
          name: 'numeric',
          dispName: '数字'
        })
        for (let i = 0; i < coin.companies.length; i++) {
          compList.push(companies[coin.companies[i]])
        }
        return compList
      }
      return []
    },
    object2List () {
      let coin = this.getCoin(this.alert.coin)
      if (coin) {
        let compList = []
        compList.push({
          name: 'none',
          dispName: '選択してください'
        })
        compList.push({
          name: 'numeric',
          dispName: '数字'
        })
        for (let i = 0; i < coin.companies.length; i++) {
          compList.push(companies[coin.companies[i]])
        }
        return compList
      }
      return []
    },
    customValid1 () {
      if (this.object1 !== 'numeric') {
        return false
      }
      let num = parseFloat(this.object1Value)
      return isNaN(num)
    },
    customValid2 () {
      if (this.object2 !== 'numeric') {
        return false
      }
      let num = parseFloat(this.object2Value)
      return isNaN(num)
    }
  },
  methods: {
    getCoin (short) {
      for (var i = 0; i < coins.length; i++) {
        if (coins[i].short === short) {
          return coins[i]
        }
      }
      return null
    },
    onInput (el) {
      console.log('onINput')
      var self = this
      if (this.changedTimeout) {
        clearTimeout(this.changedTime)
      }
      this.changedTimeout = setTimeout((el) => {
        self.$refs[el].MaterialTextfield.checkDirty()
      }, 300, el)
    },
    isCoinSelected () {
      var self = this
      setTimeout(() => {
        self.$refs.object2.MaterialTextfield.checkDirty()
        self.$refs.object1.MaterialTextfield.checkDirty()
      }, 300)
      return this.alert && this.alert.coin && this.alert.coin !== 'none'
    },
    checkConfig () {
      let hasError = false

      if (!this.alert.coin || this.alert.coin === 'none') {
        hasError = true
      }

      if (!this.alert.object1 || this.alert.object1 === 'none') {
        hasError = true
      }

      if (!this.alert.object2 || this.alert.object2 === 'none') {
        hasError = true
      }

      if (!this.alert.object1Value || (this.alert.object1 === 'numeric' && this.alert.object1Value)) {
        hasError = true
      }

      if (!this.alert.object2Value || (this.alert.object2 === 'numeric' && this.alert.object2Value)) {
        hasError = true
      }

      if (!this.alert.action) {
        hasError = true
      }

      return !hasError
    },
    saveAlert () {
      // let hasError = this.checkConfig()
      // if (hasError) {
      //   this.$parent.showSnack('項目に間違いがあります')
      //   return
      // }
      if (this.$v.alert.$error) {
        this.$parent.showSnack('項目に間違いがあります')
        return
      }

      this.$parent.showSnack('保存しました')
      this.$store.dispatch('alert/setAlert', this.alert)
    },
    deleteAlert () {
      this.$store.dispatch('alert/deleteAlert', this.alert)
      this.$parent.showSnack('削除しました')
    }
  },
  validations: {
    alert: {
      name: {
        required
      },
      action: {
        required,
        isUnique (value) {
          if (!value || value === 'none') return false
          else return true
        }
      },
      object1: {
        required,
        isUnique (value) {
          if (!value || value === 'none') return false
          else return true
        }
      },
      object1Value: {
        required,
        isUnique (value) {
          if (value === 'ask' || value === 'bid') {
            return true
          } else {
            let num = parseFloat(value)
            console.log('numeric' + num)
            if (num !== 0 && !num) {
              return false
            } else {
              return true
            }
          }
        }
      },
      object2: {
        required,
        isUnique (value) {
          if (!value || value === 'none') return false
          else return true
        }
      },
      object2Value: {
        required,
        isUnique (value) {
          if (value === 'ask' || value === 'bid') {
            return true
          } else {
            let num = parseFloat(value)
            console.log('numeric' + num)
            if (num !== 0 && !num) {
              return false
            } else {
              return true
            }
          }
        }
      },
      coin: {
        required,
        isUnique (value) {
          if (!value || value === 'none') return false
          else return true
        }
      }
    }
  },
  watch: {
    // 'alert.coin': (val) => {
    //   console.log('watch alert.coin' + val)
    //   let coin = (() => {
    //     for (var i = 0; i < coins.length; i++)
    //     {
    //       if (coins[i].name === val)
    //       {
    //         return coins[i]
    //       }
    //     }
    //     return null
    //   })()
    //   if (coin) {
    //     this.object1List.clear()
    //     this.object2List.clear()
    //     let compList = []
    //     compList.push({
    //       name: 'none',
    //       dispName: '選択してください'
    //     })
    //     compList.push({
    //       name: 'numeric',
    //       dispName: '数字'
    //     })
    //     for (let i = 0; i < coin.companies.length; i++)
    //     {
    //       compList.push(companies[coin.companies[i]])
    //     }
    //     this.object1List.concat(compList)
    //     this.object2List.concat(compList)
    //   }
    //   else
    //   {
    //     // 選択されてない場合は、コイン選択以外の値をリセットして
    //     // 非表示にする
    //     this.object1List.clear()
    //     this.object2List.clear()

    //     this.alert.object1 = 'none'
    //     this.alert.object1Value = 'none'
    //     this.alert.object2 = 'none'
    //     this.alert.object2Value = 'none'
    //   }
    // },
    'alert.object1': {
      handler: function (val, oldVal) {
        if (val === 'numeric') {
          if (this.alert.object1Value === 'bid' || this.alert.objecct1Value === 'ask') {
            this.alert.object1Value = ''
          }
        } else if (oldVal === 'numeric') {
          this.alert.object1Value = 'ask'
        }
      },
      deep: true
    },
    'alert.object2': {
      handler: function (val, oldVal) {
        if (val === 'numeric') {
          if (this.alert.object2Value === 'bid' || this.alert.objecct2Value === 'ask') {
            this.alert.object2Value = ''
          }
        } else if (oldVal === 'numeric') {
          this.alert.object2Value = 'ask'
        }
      },
      deep: true
    },
    'alert.enable': (val) => {
      if (val) {
        // if enable, check value valid
      }
    }
  }
}
</script>

<style>

.form-spacer {
  min-height: 20px;
}
.form-group--alert, .form-group--error {
}
.form-group {
}
.form-group--error .form-group__message {
    display: block;
    visibility: visible;
    color: #d50000;
}
</style>