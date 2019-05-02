<template>
  <v-toolbar color="white">
    <v-toolbar-title><span class="font-weight-bold">Traces</span> analyzer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/">Traces</v-btn>
      <v-btn flat to="vocabulary">Vocabulary</v-btn>
      <v-btn flat @click="openForm()">Bug</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Toolbar',
    methods: {
      openForm() {
        console.log(1);
      }
    }
  };
</script>

<style scoped>

</style>
