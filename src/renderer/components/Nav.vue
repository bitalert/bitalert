<template>
    <aside class="mdl-components__nav docs-text-styling mdl-shadow--4dp">
        <div class="docs-layout-title mdl-layout-title alert-outline" style="margin: 16px;border-width: 2px; text-align: center;">bit-alert</div>
        <router-link v-for="coin in coins" :key="coin.name" :to="{name: 'coin', params: {'coin': coin.short}}" 
        class="mdl-components__link mdl-component badges" :class="{'is-active': isActive(coin.short)}">
            <div class="mdl-components__link-image" :style="{'background-image': 'url(' + coin.image + ')'} ">
            </div>
            <span class="mdl-components__link-text">{{coin.dispName}}</span>
        </router-link>
        <!-- アラート -->
        <router-link :to="{name: 'alert'}" class="mdl-components__link mdl-component badges" :class="{'is-active': isActive('alert')}">
            <div class="mdl-components__link-image" style="text-align: center;">
                <i class="material-icons">&#xE7F4;</i>
            </div>
            <span class="mdl-components__link-text">アラート</span>
        </router-link>
        <a href="#" class="mdl-components__link mdl-component badges" @click.prevent="showAboutDialog()">
            <div class="mdl-components__link-image" style="text-align: center;">
                <i class="material-icons">&#xE887;</i>
            </div>
            <span class="mdl-components__link-text">About</span>
        </a>
        <about-dialog ref="about"></about-dialog>
    </aside>
</template>

<script>
import coins from '../coins'
import AboutDialog from './AboutDialog'
export default {
  data () {
    return {
      coins: coins
    }
  },
  methods: {
    isActive (short) {
      if (short === 'alert') {
      // FIXME:
        return this.$route.name === 'alert'
      } else {
        return short === this.$route.params.coin
      }
    },
    showAboutDialog () {
      this.$refs.about.show()
    }
  },
  components: {
    AboutDialog
  }
}
</script>

<style>
.docs-text-styling a {
    text-decoration: none;
}
</style>