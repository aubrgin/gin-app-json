<template>
  <div class="gin-app-json">
    <template v-if="computedPath">
      <gin-button @click="save">
        Save
      </gin-button>
      <gin-tree v-model="value" :edit="true" />
    </template>
    <template v-else>
      <gin-button @click="openFile" >
        Open file
      </gin-button>
    </template>
  </div>
</template>

<script>
import { GinTree, GinButton } from '@aubrgin/gin-components';
import electron from 'electron';
 import fs from 'fs';

export default {
  name: 'GinAppJson',
   components: {
     GinTree,
     GinButton,
   },
   props: {
     path: {
       type: String,
       default: '',
     }
   },
   computed: {
     computedPath() {
       return this.path || this.dataPath;
     },
   },
   data() {
     return {
       value: '',
       dataPath: '',
     };
   },
   methods: {
     async openFile() {
       const paths = await electron.remote.dialog.showOpenDialog({
         properties: ['showHiddenFiles'],
       });
       this.dataPath = paths.filePaths[0];
       if (fs.existsSync(this.dataPath)) {
         fs.readFile(this.dataPath, (err, content) => {
           this.value = JSON.parse(content);
         });
       } else {
         this.value = {};
       }
     },
     async save() {
       fs.writeFile(this.dataPath, JSON.stringify(this.value, null, 2), () => {});
     },
   },
};
</script>

<style>
</style>
