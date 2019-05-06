<template>
  <v-app>
    <toolbar-component></toolbar-component>
    <v-content>
      <router-view></router-view>
    </v-content>
    <bug-form-component></bug-form-component>
  </v-app>
</template>

<script>
  import ToolbarComponent from '@/components/Toolbar';
  import BugFormComponent from '@/components/BugForm';

  export default {
    components: {
      ToolbarComponent,
      BugFormComponent
    },
    name: 'app'
  };
</script>

<style>

</style>
