<template>
    <div class="docs-layout mdl-layout mdl-js-layout" >
      <main class="docs-layout-content mdl-layout__content mdl-color-text--grey-600">
          
          <div class="content mdl-grid mdl-grid--no-spacing" id="content">
              <div class="mdl-components mdl-js-components mdl-cell mdl-cell--12-col">
                  <app-nav></app-nav>
                  <app-content></app-content>
              </div>
          </div>
      </main>
    </div>
</template>

<script>
import Nav from './Nav'
import Content from './Content'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  },
  components: {
    AppNav: Nav,
    AppContent: Content
  }
}
</script>