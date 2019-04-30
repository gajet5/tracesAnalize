<template>
  <v-app>
    <toolbar-component></toolbar-component>
    <v-content>
      <router-view></router-view>
    </v-content>
    <footer-component></footer-component>
  </v-app>
</template>

<script>
  import FooterComponent from '@/components/Footer';
  import ToolbarComponent from '@/components/Toolbar';

  export default {
    components: {
      FooterComponent,
      ToolbarComponent
    },
    name: 'app'
  };
</script>

<style>

</style>
