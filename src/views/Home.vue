<template>
  <v-container class="mt-20">
    <v-row>
      <v-col cols="2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          nemo odit quos, enim quam debitis corporis, suscipit veniam tenetur
          perspiciatis qui minima consequatur impedit! Dolor quam quos obcaecati
          velit corporis!
        </p>
      </v-col>
      <v-col col="10">         

        <Anuncio></Anuncio>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '../db'
import Anuncio from "@/components/Anuncios.vue";

export default {
  name: "Home",
  components: {
    Anuncio,    
  },  
  data() {
        return {
            tareas: []
        }
  },
  firebase : {
        tareas: db.collection('tareas'),
  },
  
};


</script>
