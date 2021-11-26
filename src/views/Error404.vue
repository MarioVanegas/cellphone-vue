<template>
  <div>
   <v-container>     
      <v-row>
        <v-col class=" text-h4 text-center">
          Ha ocurrido un error
        </v-col>
      </v-row>
      <v-row class="mb-15">
        <v-col class="text-center text-subtitle-1">
          La pagina que estas buscando no ha sido encontrada. 
          <router-link to="/" class="blue--text">Volver al inicio</router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonError404",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
