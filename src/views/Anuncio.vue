<template>
  <div class="Anuncio">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-card>
            <v-carousel cycle :interval="5000">
              <v-carousel-item
                v-for="(url, index) in imagenes"
                :src="url"
                lazy-src="https://wallpaperaccess.com/full/1285990.jpg"
                :key="index"
              >
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <v-card>
            <v-card-title class="text-h3">
              {{ anuncio.titulo }}
            </v-card-title>
            <v-card-subtitle>
              <v-row align="center" class="mx-0 my-2">
                <v-rating
                  :value="Math.floor(Math.random() * (6 - 1) + 1)"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="grey--text mx-4">
                  ({{ Math.floor(Math.random() * 10000) }})
                </div>
              </v-row>
              <v-row
                class="
                  mx-0
                  my-2
                  text-caption
                  font-weight-light
                  d-flex
                  aling-center
                "
              >
                <span>Vendedor:</span>
                <v-chip small pill class="mx-1">
                  <v-icon>mdi-account</v-icon>
                  <span>{{ anuncio.vendedor }}</span>
                </v-chip>
                <span>Teléfono:</span>
                <v-chip small pill class="mx-1">
                  <v-icon>mdi-cellphone</v-icon>
                  <span> {{ anuncio.telefono }}</span>
                </v-chip>
              </v-row>
              <v-row class="mx-0 mt-2 text-caption font-weight-light">
                Estado: {{ anuncio.estado ? "Nuevo" : "Usado" }}
              </v-row>
              <br /><br />
              <v-row class="mx-0 text-caption font-weight-light">
                <div class="d-flex align-center">
                  <v-icon style="color: #9e9e9e">mdi-shopping-outline</v-icon>
                  <span class="ml-1">Envios a El Salvador</span>
                </div>
              </v-row>
            </v-card-subtitle>
            <v-card-text>
              <v-row class="mx-0 mt-5 d-flex aling-self-start">
                <span class="text-h3">$ {{ anuncio.precio }}</span>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="red darken-4"
                dark
                @click="
                  agregarAlCarrito2({
                    id: $route.params.id,
                    data: anuncio,
                    url: imagenes[0],
                  })
                "
              >
                <span>Agregar</span>
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            :class="{ 'd-flex aling-center': $vuetify.breakpoint.mdAndUp }"
          >
            <v-card-text>
              <p class="text-h5 black--text">Especificaciones técnicas:</p>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td width="10%" class="text-center">
                        <v-icon>mdi-alert-decagram</v-icon>
                      </td>
                      <td>Estado:</td>
                      <td>
                        {{ anuncio.estado ? "Nuevo" : "Usado" }}
                      </td>
                    </tr>
                    <tr>
                      <td width="10%" class="text-center">
                        <v-icon>mdi-cellphone-cog</v-icon>
                      </td>
                      <td>Marca:</td>
                      <td>
                        {{ anuncio.marca }}
                      </td>
                    </tr>
                    <tr>
                      <td width="10%" class="text-center">
                        <v-icon>mdi-android</v-icon>
                      </td>
                      <td>Sistema Operativo:</td>
                      <td>{{ anuncio.sistema }} {{ anuncio.version }}</td>
                    </tr>
                    <tr>
                      <td width="10%" class="text-center">
                        <v-icon>mdi-sd</v-icon>
                      </td>
                      <td>Almacenamiento:</td>
                      <td>{{ anuncio.rom }} GB</td>
                    </tr>
                    <tr>
                      <td width="10%" class="text-center">
                        <v-icon>mdi-memory</v-icon>
                      </td>
                      <td>Memoria Ram:</td>
                      <td>{{ anuncio.ram }} GB</td>
                    </tr>
                    <tr>
                      <td width="10%" class="text-center">
                        <v-icon>mdi-cellphone-screenshot</v-icon>
                      </td>
                      <td>Pantalla:</td>
                      <td>{{ anuncio.pantalla }} in</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-divider vertical inset class="d-none d-md-inline"></v-divider>
            <v-card-text>
              <p class="text-h5">Descripcion:</p>
              <p>{{ anuncio.descripcion }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db, st } from "../db.js";
import { mapMutations } from "vuex";

export default {
  name: "WorkspaceJsonAnuncio",
  components: {},

  data() {
    return {
      anuncio: {},
      imagenes: [],
    };
  },

  mounted() {},

  methods: {
    ...mapMutations(["agregarAlCarrito2"]),
    async obtenerAnuncio() {
      await db
        .collection("anuncios")
        .doc(this.$route.params.id)
        .get()
        .then((r) => {
          this.anuncio = r.data();
        })
        .catch((e) => {
          console.log(e);
        });
      await st
        .ref()
        .child(this.$route.params.id + "-img/")
        .listAll()
        .then(async (img) => {
          img.items.forEach((imgPath) => {
            st.ref()
              .child(imgPath.fullPath)
              .getDownloadURL()
              .then((url) => {
                this.imagenes.push(url);
              })
              .catch((e) => {
                console.log(e);
              });
          });
          if (img.items.length == 0) {
            this.imagenes.push(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
            );
          }
        })
        .catch((eUrl) => {
          console.log(eUrl);
        });
    },
  },
  created() {
    this.obtenerAnuncio();
  },
};
</script>

<style lang="scss" scoped></style>
