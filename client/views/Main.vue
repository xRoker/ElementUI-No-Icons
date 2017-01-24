<template>
  <div id="main" class="layout-page">

    <el-menu theme="dark" default-active="1" class="navbar" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">Orders</el-menu-item>
    </el-menu>
      
    <router-view class="layout-content"></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
.navbar{
  height: 60px;
}
</style>