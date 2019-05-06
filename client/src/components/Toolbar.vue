<template>
  <v-toolbar color="white">
    <v-toolbar-title><span class="font-weight-bold">Traces</span> analyzer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/">Traces</v-btn>
      <v-btn flat to="vocabulary" v-show="orgStatus">Vocabulary</v-btn>
      <v-btn flat @click="openForm()">Bug</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import infoApi from '@/services/info';

  export default {
    name: 'Toolbar',
    async beforeMount() {
      const data = await infoApi.ip();
      if (data.org === 'Kaspersky Lab AO') {
        this.orgStatus = true;
      }
    },
    data() {
      return {
        orgStatus: false
      };
    },
    methods: {
      openForm() {
        this.$store.commit('setBugForm', !this.$store.getters.bugForm);
      }
    }
  };
</script>

<style scoped>

</style>
