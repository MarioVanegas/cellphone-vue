<template>
  <v-app>
    <Toolbar @busqueda="nuevaCadena = $event"></Toolbar>
    <v-main>
      <v-snackbar v-model="storeSnackbar" top right color="red darken-4" timeout="-1">
        Producto agregado a su carrito.
        <template v-slot:action="{ attrs }">
          <v-btn color="white" icon v-bind="attrs" @click="setSnackbar">
            <v-icon right>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <router-view :busqueda="nuevaCadena" />
    </v-main>
    <v-footer dark padless>
      <v-card
        flat
        tile
        class="dark darken-4 white--text text-center"
        style="width: 100%"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          Desarrollado por:
          <strong> Mario Edgardo Vanegas Cardoza VC17018 </strong>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          Fundamentos de la programación en internet 2021 Universidad de El
          Salvador
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>© All Right Reserved</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
  Toolbar    
  },
  data: () => ({

    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    nuevaCadena: "",
    nav: [
      {
        icon: "home",
        text: "Home",
        title: "Back to Home page",
        active: true,
      },
      {
        icon: "info",
        text: "About",
        title: "About this demo",
        active: false,
      },
      {
        icon: "assignment_turned_in",
        text: "Todos",
        title: "Some stuff that needs doing",
        active: false,
      },
      {
        icon: "email",
        text: "Contact",
        title: "Our Contact info",
        active: false,
      },
    ],
  }),
  methods: {
    ...mapMutations(["setSnackbar"]),
  },
  computed: {
    ...mapState(["storeSnackbar"]),
  },
 };
</script>
