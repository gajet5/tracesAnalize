<template>
  <v-app>
    <toolbar-component></toolbar-component>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import ToolbarComponent from '@/components/Toolbar';

  export default {
    components: {
      ToolbarComponent
    },
    name: 'app'
  };
</script>

<style>

</style>
