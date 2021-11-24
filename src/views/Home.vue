<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <!-- Filtros columna izquierda -->
        <v-col class="hidden-md-and-down" lg="2">
          <v-switch @click="filtro" class="pl-5" :label="`Nuevo`"></v-switch>
          <v-card outlined>
            <!-- Filtro Marca -->
            <v-card-title class="pb-0">Marca</v-card-title>
            <v-container class="pt-0" fluid>
              <v-list>
                <v-list-item v-for="item in marca" :key="item.texto">
                  <v-list-item-content class="margen">
                    <v-list-item-title class="pl-2 pb-2">
                      <v-checkbox
                        v-model="marcaSeleccion"
                        :label="`${item.texto}`"
                        :value="item.value"
                        hide-details
                        dense
                      ></v-checkbox>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-container>
            <!-- Fin Filtro Marca -->
            <v-divider></v-divider>
            <!-- Filtro Sistema -->
            <v-card-title class="pb-0">Sistema</v-card-title>
            <v-container class="pt-0" fluid>
              <v-list>
                <v-list-item v-for="item in sistema" :key="item.texto">
                  <v-list-item-content class="margen">
                    <v-list-item-title class="pl-2 pb-2">
                      <v-checkbox
                        v-model="sistemaSeleccion"
                        :label="`${item.texto}`"
                        :value="item.value"
                        hide-details
                        dense
                      ></v-checkbox>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-container>
            <!-- Fin Filtro Sistema -->
            <v-divider></v-divider>
            <!-- Filtro Sistema -->
            <v-card-title class="pb-0">Pantalla</v-card-title>
            <v-container class="pt-0" fluid>
              <v-list>
                <v-list-item v-for="item in pantalla" :key="item.texto">
                  <v-list-item-content class="margen">
                    <v-list-item-title class="pl-2 pb-2">
                      <v-checkbox
                        v-model="pantallaSeleccion"
                        :label="`${item.texto}`"
                        :value="item.value"
                        hide-details
                        dense
                      ></v-checkbox>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-container>
            <!-- Fin Filtro Sistema -->
            <!-- Filtro Precio -->
            <v-divider></v-divider>
            <v-card-title>Precio</v-card-title>
            <v-range-slider
              @keyup.capture="precioFiltro"
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">a</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Fin Filtro Precio -->
          </v-card>
        </v-col>
        <!--Filtros y cards derecha -->
        <v-col cols="12" lg="10">
          <!-- Filtro ordenar -->
          <v-data-iterator
            loading="true"
            :items="anuncios"
            :page="page"
            :items-per-page.sync="itemsPerPage"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
            hide-default-footer
          >
            <!-- Header con filtros-->
            <template v-slot:header>
              <v-row no-gutters class="mb-5">
                <v-col cols="12" sm="8">
                  <v-select
                    dense
                    v-model="sortBy"
                    flat
                    solo-inverted
                    hide-details
                    :items="keys"
                    label="Ordenar por"
                    prepend-inner-icon="mdi-swap-vertical"
                  ></v-select>
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  class="d-flex align-center justify-center mt-2 mt-sm-0"
                >
                  <v-btn-toggle v-model="sortDesc" mandatory>
                    <v-btn class="white" :value="false" small>
                      <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn small class="white" :value="true">
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col
                  cols="3"
                  sm="2"
                  class="d-flex align-center justify-center mt-2 mt-sm-0"
                >
                  <span
                    class="grey--text ml-2"
                    v-if="$vuetify.breakpoint.mdAndUp"
                    >Articulos:
                  </span>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        class="white elevation-0"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ itemsPerPage }}
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(number, index) in itemsPerPageArray"
                        :key="index"
                        @click="updateItemsPerPage(number)"
                      >
                        <v-list-item-title>{{ number }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </template>
            <!--slot de loading-->
            <template v-slot:loading>
              <v-progress-linear
                color="black"
                indeterminate
                rounded
                height="6"
              ></v-progress-linear>
            </template>
            <!-- Fin Filtro ordenar -->
            <v-divider></v-divider>
            <!-- crear cards -->
            <template v-slot>
              <v-row class="pt-5">
                <v-col
                  v-for="anuncio in buscarProductos"
                  :key="anuncio.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  max-height="500"
                  class="px-2"
                >
                  <v-card
                    :loading="loading"
                    class="mx-auto my-2"
                    max-width="374"
                  >
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>
                    <router-link :to="'/anuncio/' + anuncio.id">
                      <v-img
                        height="250"
                        :src="anuncio.imagen"
                        lazy-src="https://wallpaperaccess.com/full/1285990.jpg"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey "
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </router-link>
                    <v-card-title class="mt-n2 mb-n9">
                      <p class="text-truncate">{{ anuncio.titulo }}</p>
                    </v-card-title>
                    <v-card-text>
                      <v-row align="center" class="mx-0" no-gutters>
                        <v-col>
                          <v-rating
                            :value="Math.floor(Math.random() * 10)"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="15"
                          ></v-rating>
                        </v-col>
                        <v-col>
                          <div class="my-1 subtitle-1">
                            $ {{ anuncio.precio }}
                          </div>
                        </v-col>
                        <v-col>
                          <span>{{ antiguedad(anuncio.fecha.seconds) }}</span>
                        </v-col>
                      </v-row>
                      <v-chip class="" color="light" outlined x-small>
                        <v-icon left small> mdi-account </v-icon>
                        {{ anuncio.vendedor }}
                      </v-chip>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>

                    <v-card-text class="my-n3">
                      <v-chip-group
                        v-model="selection"
                        active-class="deep-purple accent-4 white--text"
                        column
                      >
                        <v-chip small>{{ anuncio.rom }} GB</v-chip>                        
                        <v-chip small>{{ anuncio.sistema }}</v-chip>
                        <v-chip small>{{ anuncio.marca }}</v-chip>
                        <v-chip small>{{
                          anuncio.estado ? "Nuevo" : "Usado"
                        }}</v-chip>
                      </v-chip-group>
                    </v-card-text>

                    <v-card-actions class="grey darken-3 mt-n4">
                      <router-link
                        :to="{ name: 'Anuncio', params: { id: anuncio.id } }"
                        class="text-decoration-none"
                      >
                        <v-btn class="ml-4" color="blue-grey" small dark>
                          Ver producto <v-icon>mdi-plus</v-icon></v-btn
                        >
                      </router-link>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="mr-4"
                        fab
                        dark
                        small
                        color="red"
                      >
                        <v-icon dark>mdi-cart-plus</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </template>
            <!-- Fin de cards -->
            <!-- Footer -->
            <template v-slot:footer
              ><v-row>
                <v-col class="text-center pt-6">
                  <v-pagination
                    v-model="page"
                    :length="nPaginas"
                    :total-visible="7"
                  ></v-pagination>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
          <!-- Fin Footer -->
        </v-col>
        <!-- Fin Filtros y cards derecha -->
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { db, st } from "../db.js";
import moment from "moment";
import { mapState } from "vuex";
moment.locale("es");

export default {
  name: "Home",
  components: {},
  props: ["busqueda"],
  anuncios: Array,
  data() {
    return {
      itemsPerPageArray: [2, 4, 8, 12],
      itemsPerPage: 8,
      sortDesc: false,
      loadingData: true,
      anuncios: [],
      dialog: false,
      loading: false,
      selection: 1,
      estadoActivo: false,
      cantidadmax: null,
      marcaSeleccion: [],
      sistemaSeleccion: [],
      pantallaSeleccion: [],
      sortBy: "marca",
      keys: [
        "Marca",
        "Descripcion",
        "Estado",
        "Marca",
        "Modelo",
        "Pantalla",
        "Precio",
        "Ram",
        "Rom",
        "Sistema",
        "Telefono",
        "Titulo",
        "Vendedor",
        "Creado",
      ],
      marca: [
        { texto: "Samsung", value: "samsung" },
        { texto: "Huawei", value: "huawei" },
        { texto: "Nokia", value: "nokia" },
        { texto: "Apple", value: "apple" },
        { texto: "Xiaomi", value: "xiaomi" },
        { texto: "Google", value: "google" },
        { texto: "Oppo", value: "oppo" },
        { texto: "Motorola", value: "motorola" },
      ],
      sistema: [
        { texto: "Android", value: "Android" },
        { texto: "IOS", value: "IOS" },
      ],
      pantalla: [
        { texto: "7 inch", value: "7" },
        { texto: "6 inch", value: "6" },
        { texto: "5 inch", value: "5" },
        { texto: "4 inch", value: "4" },
      ],
      range: [0, 1000],
      min: 0,
      max: 1000,
      page: 1,
    };
  },
  methods: {
    async obtenerAnuncios() {
      var anunciosLocal = [];
      await db
        .collection("anuncios")
        .get()
        .then((r) => {
          var cantidadAnuncios = r.size;
          var contador = 0;
          r.forEach(async (anuncio) => {
            let anuncioData = anuncio.data();
            await st
              .ref()
              .child(anuncio.id + "-img/")
              .list({ maxResults: 1 })
              .then(async (img) => {
                await st
                  .ref()
                  .child(anuncio.id + "-img/" + img.items[0].name)
                  .getDownloadURL()
                  .then((url) => {
                    contador = contador + 1;
                    anuncioData.imagen = url;
                  })
                  .catch((eUrl) => {
                    console.log(eUrl);
                  });
              })
              .catch((eImg) => {
                contador = contador + 1;
                anuncioData.imagen =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
                console.log(eImg);
              });
            if (contador == cantidadAnuncios) {
              this.loadingData = false;
            }
            anuncioData.id = anuncio.id;
            anunciosLocal.push(anuncioData);
          });
        })
        .catch((e) => {
          console.log(e);
        });
      //this.anuncios = anunciosLocal;
      this.anuncios = anunciosLocal;
      this.buscarProductos;
    },
    filtro() {
      this.estadoActivo = !this.estadoActivo;
      /* Estado = Nuevo */
      if (this.estadoActivo == false) {
        this.$bind("anuncios", db.collection("anuncios"));
      } else {
        this.$bind(
          "anuncios",
          db.collection("anuncios").where("estado", "==", true)
        );
      }
      /* Fin Estado = Nuevo */
    },
    antiguedad(segundos) {
      return moment(segundos, "X").fromNow();
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
  created() {
    this.obtenerAnuncios();
  },
  computed: {
    filtros: function () {
      return this.anuncios.filter(function (filtro) {
        if (
          this.marcaSeleccion.length > 0 ||
          this.pantallaSeleccion.length > 0 ||
          this.sistemaSeleccion.length > 0
        ) {
          if (
            (this.marcaSeleccion.length > 0) &
            (this.pantallaSeleccion.length > 0)
          ) {
            return (
              this.marcaSeleccion.includes(filtro.marca) &
              this.pantallaSeleccion.includes(filtro.pantalla) &
              (this.switch1 === filtro.nuevo) &
              ((filtro.precio >= this.range[0]) &
                (filtro.precio <= this.range[1]))
            );
          } else if (
            (this.marcaSeleccion.length > 0) &
            (this.sistemaSeleccion.length > 0)
          ) {
            return (
              this.marcaSeleccion.includes(filtro.marca) &
              this.sistemaSeleccion.includes(filtro.sistema) &
              (this.switch1 === filtro.nuevo) &
              ((filtro.precio >= this.range[0]) &
                (filtro.precio <= this.range[1]))
            );
          } else if (
            (this.sistemaSeleccion.length > 0) &
            (this.pantallaSeleccion.length > 0)
          ) {
            return (
              this.sistemaSeleccion.includes(filtro.sistema) &
              this.pantallaSeleccion.includes(filtro.pantalla) &
              (this.switch1 === filtro.nuevo) &
              ((filtro.precio >= this.range[0]) &
                (filtro.precio <= this.range[1]))
            );
          } else {
            return (
              (this.marcaSeleccion.includes(filtro.marca) ||
                this.sistemaSeleccion.includes(filtro.sistema) ||
                this.pantallaSeleccion.includes(filtro.pantalla)) &
              (this.switch1 === filtro.nuevo) &
              ((filtro.precio >= this.range[0]) &
                (filtro.precio <= this.range[1]))
            );
          }
        } else {
          return (
            !this.marcaSeleccion.includes(filtro.marca) &
            !this.sistemaSeleccion.includes(filtro.sistema) &
            !this.pantallaSeleccion.includes(filtro.pantalla) &
            (this.switch1 === filtro.nuevo) &
            ((filtro.precio >= this.range[0]) &
              (filtro.precio <= this.range[1]))
          );
        }
      }, this);
    },
    paginarProductos: function () {
      let copia = this.filtros.slice();
      let nuevo = [];
      for (
        let i = (this.page - 1) * this.itemsPerPage;
        i < this.page * this.itemsPerPage;
        i++
      ) {
        if (i < copia.length) {
          nuevo.push(copia[i]);
        }
      }
      return nuevo;
    },
    buscarProductos: function () {
      if (this.busqueda.length === 0) {
        let this2 = this;
        this2.cantidadmax = this.paginarProductos.length;
        return this.paginarProductos.slice();
      } else {
        let this2 = this;
        this2.cantidadmax = this.anuncios.filter((item) => {
          let x = item.titulo
            .toLowerCase()
            .indexOf(this.busqueda.toLowerCase());
          return x >= 0;
        }).length;
        return this.anuncios.filter((item) => {
          let x = item.descripcion
            .toLowerCase()
            .indexOf(this.busqueda.toLowerCase());
          return x >= 0;
        });
      }
    },
    nPaginas() {
      if (this.busqueda.length === 0) {
        return Math.ceil(this.filtros.length / this.itemsPerPage);
      } else {
        return Math.ceil(this.cantidadmax / this.itemsPerPage);
      }
    },

    ...mapState(["agrego"]),

    numberOfPages() {
      return Math.ceil(this.anuncios.length / this.itemsPerPage);
    },
  },
  watch: {
    nuevo: function () {
      this.loadingData = true;
      this.obtenerAnuncios();
    },
  },
};
</script>

<style lang="sss" scoped></style>
