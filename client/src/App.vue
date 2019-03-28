<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card color="teal darken-2" class="white--text">
            <v-layout>
              <v-flex xs3 class="text-xs-left">
                <v-img
                  :src="require('./assets/joshua-j-cotten-1459406-unsplash.jpg')"
                  height="250px"
                  cover
                ></v-img>
              </v-flex>
              <v-flex xs9>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Action Analyzer</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>
                    Upload your log file.
                  </div>
                  <div>
                    Get an analysis of your actions.
                  </div>
                </v-card-text>
                <div>
                  <v-alert
                    :value="true"
                    color="amber darken-3"
                    icon="info"
                  >
                    Only interface logs are suitable for download.
                  </v-alert>
                </div>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              Download traces file
              <v-spacer></v-spacer>
              <vue-upload-component
                class="v-btn teal"
                v-model="files"
              >
                <div class="v-btn__content fill-height">
                  Select file
                </div>
              </vue-upload-component>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>

        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import VueUploadComponent from 'vue-upload-component';

  export default {
    name: 'app',
    components: {
      VueUploadComponent
    },
    data() {
      return {
        request: null,
        files: []
      };
    }
  };
</script>

<style>

</style>
