<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="dark" class="px-10">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nuevo anuncio</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text color="red" @click="cancelar"> Cancelar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-6">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  :items="marcas"
                  v-model="anuncio.marca"
                  label="Marca"
                  :rules="marcaRules"
                  outlined
                  color="blue"
                  item-color="blue"
                  required
                ></v-select>
                <v-row class="d-flex aling-center">
                  <v-col>
                    <v-select
                      :items="so"
                      v-model="anuncio.sistema"
                      item-text="tipo"
                      item-value="tipo"
                      label="Sistema"
                      @change="obtenerVersionesOP"
                      :rules="sistemaRules"
                      outlined
                      color="blue"
                      item-color="blue"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="5" v-if="sistemaIndex != null">
                    <v-select
                      :items="so[sistemaIndex].version"
                      v-model="anuncio.version"
                      label="Version"
                      :rules="versionRules"
                      outlined
                      color="blue"
                      item-color="blue"
                      required
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="anuncio.pantalla"
                  label="Pantalla"
                  type="number"
                  :rules="pantallaRules"
                  outlined
                  color="blue"
                  required
                >
                  <span slot="append">in</span>
                </v-text-field>
                <v-select
                  :items="ram"
                  v-model="anuncio.ram"
                  label="RAM"
                  :rules="ramRules"
                  outlined
                  color="blue"
                  item-color="blue"
                  required
                >
                  <span slot="append">GB</span>
                </v-select>
                <v-select
                  :items="rom"
                  v-model="anuncio.rom"
                  label="ROM"
                  :rules="romRules"
                  outlined
                  color="blue"
                  item-color="blue"
                  required
                >
                  <span slot="append">GB</span>
                </v-select>
                <v-switch
                  v-model="anuncio.estado"
                  label="Nuevo"
                  inset
                  hint="Estado del Dispositivo"
                  outlined
                  color="blue"
                  persistent-hint
                ></v-switch>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="anuncio.titulo"
                  :counter="100"
                  :rules="tituloRules"
                  label="Titulo"
                  hint="Marca del Celular, modelo,etc."
                  outlined
                  color="blue"
                  required
                ></v-text-field>
                <v-textarea
                  label="Descripcion"
                  v-model="anuncio.descripcion"
                  :counter="1000"
                  hint="Breve descripcion del producto, caracteristicas, contenido, etc."
                  :rules="descripcionRules"
                  outlined
                  color="blue"
                  required
                ></v-textarea>
                <v-row>
                  <v-col cols="6" md="4">
                    <v-text-field
                      v-model="anuncio.precio"
                      label="Precio"
                      type="number"
                      prepend-inner-icon="mdi-currency-usd"
                      :rules="precioRules"
                      outlined
                      color="blue"
                      required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="anuncio.vendedor"
                      label="Nombre del Vendedor"
                      hint="Nombre Apellido"
                      :rules="nombreRules"
                      outlined
                      color="blue"
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="7">
                    <VuePhoneNumberInput
                      v-model="tel"
                      color="#2196F3"
                      clearable
                      :translations="traducciones"
                      fetch-country
                      @update="obtenerTelefono"
                      valid-color="#9E9E9E"
                      error-color="#F44336"
                      size="lg"
                      :error="!telValid"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-container>
          <v-row>
            <v-col>
              <v-form ref="formImg">
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp, image/jpg"
                  placeholder="Selecciona una imagen"
                  prepend-icon="mdi-paperclip"
                  v-model="imagen"
                  label="Imagen del Dispositivo"
                  :rules="imagenesRules"
                  color="blue"
                  @change="agregarImagen"
                ></v-file-input>
                <span v-if="imagenesValid" class="text-caption red--text">{{
                  msgImg
                }}</span>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="mx-auto">
              <v-card v-if="imagenesUrl.length > 0">
                <v-card-subtitle>
                  Imagenes actuales
                  {{ imagenesUrl.length }} / 5
                </v-card-subtitle>
                <v-carousel hide-delimiters show-arrows height="25em">
                  <v-carousel-item
                    v-for="(imagen, i) in imagenesUrl"
                    :key="i"
                    :src="imagen"
                  >
                    <v-btn
                      color="red"
                      @click="eliminarImagen(i)"
                      class="mr-auto mt-1"
                      ><v-icon large dark>
                        mdi-delete-forever-outline</v-icon
                      ></v-btn
                    >
                  </v-carousel-item>
                </v-carousel>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-space-between">
              <v-btn class="white--text" color="red" @click="cancelar">
                Cancelar
                <v-icon> mdi-cancel</v-icon>
              </v-btn>
              <v-btn @click="crearAnuncio"  color="green" dark class="=mr-auto">
                <span class="mr-1">Publicar</span>
                <v-icon> mdi-upload</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLoading" hide-overlay persistent width="300">
      <v-card color="blue" dark>
        <v-card-text>
          Publicando Anuncio
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" top right color="blue" timeout="-1">
      Anuncio Publicado
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon> mdi-clock-time-eight-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { st } from "../db.js";
import { db } from "../db.js";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { mapState, mapMutations } from "vuex";

export default {
  name: "CrearAnuncio",
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      snackbar: false,
      dialogLoading: false,
      dialog: false,
      anuncio: {
        titulo: null,
        descripcion: null,
        imagenes: [],
        marca: null,
        ram: null,
        rom: null,
        pantalla: null,
        sistema: null,
        version: null,
        estado: false,
        precio: null,
        vendedor: null,
        telefono: null,
        fecha: null,
      },
      tel: null,
      telValid: false,
      traducciones: {
        countrySelectorLabel: "Codigo de Pais",
        countrySelectorError: "Elige un Pais",
        phoneNumberLabel: "Telefono",
        example: "Ejemplo :",
      },
      imagenes: [],
      imagenesUrl: [],
      imagen: null,
      imagenesValid: false,
      msgImg: null,
      e1: 1,
      sistemaIndex: null,
      valid: null,
      tituloRules: [
        (v) => !!v || "El titulo es requerido",
        (v) =>
          (v && v.length <= 100) ||
          "El titulo debe ser de menos de 100 caracteres",
      ],
      descripcionRules: [
        (v) => !!v || "La descripcion es requerida",
        (v) =>
          (v && v.length <= 1000) ||
          "La descripcion debe ser de menos de 1000 caracteres",
      ],
      marcaRules: [(v) => !!v || "La marca es requerida"],
      ramRules: [(v) => !!v || "La RAM es requerida"],
      romRules: [(v) => !!v || "La ROM es requerida"],
      pantallaRules: [(v) => !!v || "El tamaño de la pantalla es requerido"],
      sistemaRules: [(v) => !!v || "El sistema perativo es requerido"],
      versionRules: [
        (v) => !!v || "La version del sistema operativo es requerida",
      ],
      precioRules: [
        (v) => !!v || "El precio es requerido",
        (v) => v > 0 || "Ingrese un precio valido",
      ],
      nombreRules: [(v) => !!v || "El nombre es requerido"],
      imagenesRules: [
        (value) =>
          !value ||
          value.size < 10000000 ||
          "La imagen debe ser de 10 MB o menos!",
      ],
    };
  },
  methods: {
    ...mapMutations(["nuevoAnuncio"]),
    obtenerVersionesOP() {
      if (this.anuncio.sistema != null) {
        this.anuncio.version = null;
        this.sistemaIndex = this.so
          .map((marca) => marca.tipo)
          .indexOf(this.anuncio.sistema);
      }
    },
    obtenerTelefono(ev) {
      this.telValid = ev.isValid;
      if (ev.isValid) {
        this.anuncio.telefono = ev.formatInternational;
      }
    },
    agregarImagen() {
      if (this.imagen != null && this.$refs.formImg.validate()) {
        this.imagenes.push(this.imagen);
        this.imagenesUrl.push(URL.createObjectURL(this.imagen));       
        this.imagen = null;
        this.imagenesValid = true;
        this.$refs.formImg.reset();
      }
    },
    eliminarImagen(index) {
      this.imagenesUrl.splice(index, 1);
      this.imagenes.splice(index, 1);
    },
    cancelar() {
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.anuncio = {
        titulo: null,
        descripcion: null,
        marca: null,
        ram: null,
        rom: null,
        pantalla: null,
        sistema: null,
        version: null,
        estado: false,
        precio: null,
        vendedor: null,
        telefono: null,
        fecha: null,
      };
      this.tel = null;
      this.telValid = false;
      this.imagenes = [];
      this.imagenesUrl = [];
      this.imagen = null;
      this.imagenesValid = false;
      this.msgImg = null;
      this.e1 = 1;
      this.sistemaIndex = null;
      this.valid = true;
    },
   async crearAnuncio() {
      if (
        this.$refs.form.validate() &&
        this.imagenesValid &&
        this.imagenes.length > 0 &&
        this.imagenes.length <= 15
      ) {
        var anuncioId = null;
        var contador = 0;
        var cantidadImg = this.imagenes.length;
        this.dialog = false;
        this.dialogLoading = true;
        this.anuncio.fecha = new Date();      
        await db
          .collection("anuncios")
          .add(this.anuncio)
          .then((r) => {
            anuncioId = r.id;
          })
          .catch((e) => {
            console.log(e);
          });
        this.imagenes.forEach((imagen) => {
          contador = contador + 1;
          st.ref(anuncioId + "-img/" + imagen.name)
            .put(imagen)
            .then(() => {
              console.log("Imagen" + imagen.name + " subida");
              if (contador == cantidadImg) {
                this.dialogLoading = false; 
                this.snackbar = true;               
                this.nuevoAnuncio();
                window.location.href = "/"
              }
            })
            .catch((e) => {
              console.log(e);
            });
        });
        this.cancelar();
      } else if (this.imagenes.length == 0) {
        this.imagenesValid = true;
        this.msgImg = "Debe seleccionar al menos una imagen";
      } else if (this.imagenes.length > 15) {
        this.imagenesValid = true;
        this.msgImg = "Solo puede seleccionar hasta 5 imagenes";
      }     
    },
  },
  computed: {
    ...mapState(["marcas", "so", "ram", "rom"]),
  },
};
</script>
