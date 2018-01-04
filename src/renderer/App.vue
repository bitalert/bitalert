<template>
  <div id="app" class="mdl-layout__container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'bit-alert'
}
</script>

<style>
.mdl-components {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.mdl-components .mdl-components__nav {
    display: inline-block;
    background: #fff;
    width: 200px;
    box-sizing: border-box;
    padding: 24px 0;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    z-index: 1;
}
.mdl-components .mdl-components__link {
    margin: 16px;
    font-weight: 400;
    color: rgba(0,0,0,.66);
    position: relative;
    padding-left: 72px;
    min-height: 48px;
    display: table;
    line-height: 48px;
}
.mdl-components .mdl-components__link.is-active {
    font-weight: 700;
    color: #c2185b;
}
.mdl-components__link-image {
    display: inline-block;
    margin: 0 10px;
    position: absolute;
    left: 0;
    top: 0;
    /*background-color: #ddd;*/
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 48px;
    border-radius: 50%;
    height: 46px;
    width: 46px;
}
.mdl-components .mdl-components__link {
    font-weight: 400;
    color: rgba(0,0,0,.66);
    line-height: 48px;
}
.mdl-components .mdl-components__pages {
    display: inline-block;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    padding-bottom: 120px;
}
.mdl-components .mdl-components__page {
    display: none;
    min-height: 1000px;
}
.mdl-components-index {
    box-sizing: border-box;
    position: relative;
    padding-top: 64px;
}
.mdl-components .mdl-components__page.is-active {
    display: block;
}

</style>
