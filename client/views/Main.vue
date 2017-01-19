<template>
  <div id="main">
    <md-whiteframe>
      <md-toolbar>
        <md-button class="md-icon-button">
          <md-icon md-src="icons/zi.svg"></md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">Default</h2>

        <md-button class="md-icon-button">
          <md-icon md-src="icons/homework.svg"></md-icon>
        </md-button>
      </md-toolbar>
    </md-whiteframe>
    
    <router-view></router-view>
  </div>
</template>