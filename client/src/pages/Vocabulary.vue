<template>
  <v-container>
    <v-layout v-show="$route.query.action === 'upload'" class="mb-2">
      <v-flex xs12>
        <v-card color="teal darken-2" class="white--text">
          <v-card-actions class="pa-3">
            Download vocabulary file
            <v-spacer></v-spacer>
            <span class="white--text pr-3">
                {{ files.length ? files[0].name : '' }}
              </span>
            <template v-if="renewBtnStatus">
              <vue-upload-component
                :drop="true"
                class="v-btn teal"
                v-model="files"
                :size="1024 * 1024 * 100"
                ref="upload"
                :post-action="uploadUrl"
              >
                <div class="v-btn__content fill-height">
                  Select file
                </div>
              </vue-upload-component>
              <v-btn
                color="teal"
                dark
                :disabled="uploadBtnStatus"
                @click.prevent="$refs.upload.active = true"
              >
                Start
              </v-btn>
              <v-btn
                color="error"
                v-show="cancelBtnStatus"
                @click.prevent="$refs.upload.active = false"
              >
                Cancel
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                color="warning"
                @click="clearFiles"
              >
                Upload new file
              </v-btn>
            </template>
          </v-card-actions>
          <v-divider light></v-divider>
          <v-progress-linear
            class="ma-0"
            v-show="cancelBtnStatus"
            color="info"
            height="15"
            :value="uploadProgress"
          ></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title>in dev</v-card-title>
          <v-card-text>
            {{ $route.query }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VueUploadComponent from 'vue-upload-component';
  import config from '@/config';

  export default {
    name: 'Vocabulary',
    components: {
      VueUploadComponent
    },
    data() {
      return {
        files: []
      };
    },
    computed: {
      uploadUrl() {
        return `${config.url}vocabulary`;
      },
      uploadBtnStatus() {
        try {
          return !(this.files.length && /^resources\.zip$/.test(this.files[0].name) && !this.$refs.upload.active);
        } catch (e) {
          return true;
        }
      },
      cancelBtnStatus() {
        try {
          return this.files[0].active;
        } catch (e) {
          return false;
        }
      },
      renewBtnStatus() {
        try {
          return !Object.keys(this.files[0].response).length;
        } catch (e) {
          return true;
        }
      },
      uploadProgress() {
        try {
          return this.files[0].progress;
        } catch (e) {
          return 0;
        }
      }
    },
    methods: {
      clearFiles() {
        this.files = [];
      }
    }
  };
</script>

<style scoped>

</style>
