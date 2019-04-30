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
        <v-btn color="teal darken-2" href="mailto:ilya.zadonsky@kaspersky.com">
          <v-icon class="mr-1">
            bug_report
          </v-icon>
          bug
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer'
  };
</script>

<style scoped>

</style>
