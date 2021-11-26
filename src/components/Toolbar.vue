<template>
  <div>
    <v-app-bar app color="grey darken-4" dark>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-flex d-md-none"
        color="red darken-2"
      ></v-app-bar-nav-icon>
      <div class="hidden-sm-and-down ml-5 mr-4">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer; align-item: center; display: flex"
        >
          <v-icon large color="red darken-2"> mdi-cellphone</v-icon>
          <span class="display-1"> CellPhone</span>
        </router-link>
      </div>
      <v-text-field
        v-model="search"
        @keyup.enter="buscar"
        placeholder="Buscar"
        hide-details
        outlined
        rounded
        filled
        dense
        color="white"
      >
      </v-text-field>
      <v-btn :ripple="false" icon @click="buscar"
        ><v-icon large color="red darken-2"> mdi-magnify</v-icon></v-btn
      >
      <v-btn-toggle title group>
        <v-btn :ripple="false" to="/" class="d-none d-md-flex"
          >Inicio<v-icon right>mdi-home</v-icon></v-btn
        >
        <v-btn :ripple="false" to="/estadisticas" class="d-none d-md-flex"
          >Estadisticas<v-icon right>mdi-finance</v-icon></v-btn
        >
        <v-btn class="icon" :ripple="false" to="/carrito">
          <v-badge
            color="green"
            overlap
            class="mt-1"
            :content="cantidad == 0 ? '0' : cantidad"
          >
            <v-icon large color="red darken-2"> mdi-cart-outline </v-icon>
          </v-badge>
        </v-btn>
      </v-btn-toggle>
      <CrearAnuncios class="ml-2" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary dark>
      <div class="text-center mt-3">
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-icon large color="red darken-2"> mdi-cellphone</v-icon>
          <h1 class="display-1 white--text">CellPhone</h1>
        </router-link>
      </div>
      <v-list>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon large color="red darken-2"> mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Inicio</v-list-item-content>
          </v-list-item>
          <v-list-item to="/estadisticas">
            <v-list-item-icon>
              <v-icon large color="red darken-2"> mdi-poll</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Estadisticas</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import CrearAnuncios from "@/components/CrearAnuncio.vue";
import { mapState } from "vuex";
export default {
  name: "WorkspaceJsonToolbar",
  components: {
    CrearAnuncios,
  },

  data() {
    return {
      drawer: false,
      search: "",
      dialog: false,
    };
  },

  mounted() {},

  methods: {
    buscar() {
      this.$emit("busqueda", this.search);
      if (this.$route.path != "/") this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["cantidad", "storeSnackbar"]),
  },
};
</script>

<style lang="scss" scoped></style>
