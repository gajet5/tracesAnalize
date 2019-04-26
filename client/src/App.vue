<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
                    <div class="headline">Traces analyzer</div>
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
              <span class="white--text pr-3">
                {{ files.length ? files[0].name : '' }}
              </span>
              <template v-if="renewBtnStatus">
                <vue-upload-component
                  class="v-btn teal"
                  v-model="files"
                  :size="1024 * 1024 * 100"
                  ref="upload"
                  post-action="https://trace-reader.ru/"
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
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout v-show="cancelBtnStatus">
        <v-flex xs12>
          <v-progress-linear
            color="teal darken-2"
            height="15"
            :value="uploadProgress"
          ></v-progress-linear>
        </v-flex>
      </v-layout>
      <v-layout class="mt-5">
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="tracesLog"
            class="elevation-1"
            :rows-per-page-items="[20, 30, 50, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 }]"
            expand
            item-key="index"
            ref="dTable"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.actions }}</td>
              </tr>
            </template>

            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
              </v-alert>
            </template>

            <template v-slot:expand="props">
              <v-card flat>
                <v-card-text>
                  <v-alert
                    :value="true"
                    color="info"
                    icon="info"
                    outline
                  >
                    <b>Source line: </b>
                    {{ props.item.line }}
                  </v-alert>
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>
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
        files: [],
        headers: [
          {
            text: 'Type',
            value: 'type',
            sortable: false
          },
          {
            text: 'Time',
            value: 'time',
            sortable: false
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false
          }
        ]
      };
    },
    computed: {
      uploadBtnStatus() {
        try {
          return !(this.files.length && /GUI\.log/.test(this.files[0].name) && !this.$refs.upload.active);
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
      tracesLog() {
        try {
          let result = [];
          let index = 0;
          
          for (let item of this.files[0].response.lines) {
            index += 1;

            result.push({
              index,
              type: item.type,
              time: item.time,
              actions: item.text,
              line: item.line
            });
          }
          
          return result;
        } catch (e) {
          return [];
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
        this.$refs.dTable.expanded = {};
        this.files = [];
      }
    }
  };
</script>

<style>

</style>
