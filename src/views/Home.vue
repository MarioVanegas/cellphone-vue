<template>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          nemo odit quos, enim quam debitis corporis, suscipit veniam tenetur
          perspiciatis qui minima consequatur impedit! Dolor quam quos obcaecati
          velit corporis!
        </p>
      </v-col>
      <v-col col="9">
        <Anuncio></Anuncio>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Anuncio from "@/components/Anuncios.vue";
export default {
  name: "Home",
  components: {
    Anuncio,
  },
};
</script>
