<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col class="hidden-md-and-down" lg="3">
          <v-switch @click="filtro" class="pl-5" :label="`Nuevo`"></v-switch>
          <v-card outlined>
            <!-- Filtro Precio -->
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
            <v-divider></v-divider>
            <!-- Fin Filtro Precio -->
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
          </v-card>
        </v-col>        
        <v-col
          v-for="anuncio in buscarProductos"
          :key="anuncio.id"
          cols="12"
          sm="4"
          md="3"
        >
          <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              :src="anuncio.imagen"
              lazy-src="https://wallpaperaccess.com/full/1285990.jpg"
            ></v-img>
            <v-card-title>{{ anuncio.titulo }}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"                 
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="grey--text ms-4">4.5</div>
              </v-row>

              <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

              <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Tonight's availability</v-card-title>
            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>{{anuncios.marcas}} </v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions>
              <router-link
                :to="{ name: 'Anuncio', params: { id: anuncio.id } }"
                class="text-decoration-none black--text"
              >
                <v-btn color="deep-purple lighten-2" text> Ver producto </v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col> 
        <v-row>
        <v-col class="text-center pt-6">
          <v-pagination
            v-model="page"
            :length="nPaginas"
            :total-visible="7"
          ></v-pagination>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          "
        >
          Articulos por pagina:
          <v-select
            :items="porPagina"
            v-model="e1"
            single-line
            style="max-width: 64px"
          >
          </v-select>
        </v-col>
      </v-row> 
             
      </v-row>  
    </v-container>
  </div>
</template>

<script>
import { db, st } from "../db.js";

export default {
  name: "Home",
  components: {},
  props: ["busqueda"],
  data() {
    return {
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
        { texto: "Windows", value: "Windows" },
        { texto: "IOS", value: "IOS" },
      ],
      pantalla: [
        { texto: "7", value: 7 },
        { texto: "6", value: 6 },
        { texto: "5", value: 5 },
      ],
      range: [0, 1000],
      min: 0,
      max: 1000,
      page: 1,
      e1: 4,
      porPagina: [2, 4, 15, 20, 25],
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
      for (let i = (this.page - 1) * this.e1; i < this.page * this.e1; i++) {
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
        return Math.ceil(this.filtros.length / this.e1);
      } else {
        return Math.ceil(this.cantidadmax / this.e1);
      }
    },
  },
};
</script>

<style lang="sss" scoped></style>
