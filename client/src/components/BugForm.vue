<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="text-xs-center">
    <v-bottom-sheet
      inset
      persistent
      :value="$store.getters.bugForm"
    >
      <v-card>
        <v-card-title primary-title>
          <h3>
            If you find a bug or have a suggestion, write.
          </h3>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="bugForm"
            v-model="bugForm"
          >
            <v-select
              v-model="reasonsSelect"
              :items="reasons"
              :rules="[rules.required]"
              label="Reasons"
              required
              color="teal darken-2"
            ></v-select>
            <v-textarea
              v-model="description"
              label="Full description of the problem."
              color="teal darken-2"
              counter="5000"
              :rules="[rules.length(5000), rules.required]"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="success">Send</v-btn>
          <v-btn flat color="error" @click="closeForm">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    name: 'BugForm',
    data() {
      return {
        bugForm: false,
        reasonsSelect: null,
        reasons: [
          'Incorrect definition of actions in the log file.',
          'Failed to download the log file.',
          'In response, an invalid screenshot of the window.',
          'Other.'
        ],
        description: '',
        rules: {
          length: len => v => (v || '').length <= len || `Invalid character length, required ${len}`,
          required: v => !!v || 'This field is required'
        }
      };
    },
    methods: {
      closeForm() {
        this.$refs.bugForm.reset();
        this.$store.commit('setBugForm', false);
      }
    }
  };
</script>

<style scoped>

</style>
