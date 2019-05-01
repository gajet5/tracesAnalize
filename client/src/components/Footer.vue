<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-actions class="grey darken-3 justify-end">
        <v-btn color="teal darken-2" @click="snackbar = true">
          <v-icon class="mr-1">
            bug_report
          </v-icon>
          bug
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      bottom
      right
      color="info"
    >
      In dev
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
        snackbar: false
      };
    }
  };
</script>

<style scoped>

</style>
