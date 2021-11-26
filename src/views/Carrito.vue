<template>
  <div class="Carrito">
    <v-container fluid>
      <h2>Productos que agregó al carrito:</h2>
      <br />
      <v-card
        v-for="(articulo, index) in carrito"
        :key="articulo.id + '-m'"
        class="my-2 d-sm-none"
      >
        <v-row>
          <v-col cols="5">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-img
                :src="articulo.imagen"
                height="120"
                width="120"
                class="mx-auto my-auto rounded"
              ></v-img>
            </router-link>
          </v-col>
          <v-col cols="7">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none black--text"
            >
              <v-row class="mr-auto">{{
                articulo.titulo.substring(0, 49).concat("...")
              }}</v-row>
            </router-link>
            <v-row class="text-caption font-weight-light d-flex aling-center mt-3">
              <span>Vendedor :</span>
              <v-chip small pill class="mx-1">
                <v-icon>mdi-account</v-icon>
                <span>{{ articulo.vendedor }}</span>
              </v-chip>
            </v-row>
            <v-row class="text-caption font-weight-light mt-3">
              <span>Telefono: {{ articulo.telefono }}</span>
            </v-row>
            <v-row class="text-caption font-weight-light">
              Estado : {{ articulo.estado ? "Nuevo" : "Usado" }}
            </v-row>
            <v-row>${{ articulo.precio }}</v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column">
            <v-row
              ><span class="mx-auto font-weight-bold">Cantidad: </span></v-row
            >
            <v-row>
              <v-btn-toggle class="mx-auto">
                <v-btn
                  :class="{ red: articulo.cantidad == 1 }"
                  :dark="articulo.cantidad == 1"
                  @click="quitar(articulo.id, index)"
                >
                <v-icon v-if="articulo.cantidad > 1" dark>
                        mdi-minus
                      </v-icon>
                      <v-icon v-else color="white">
                        mdi-trash-can-outline
                      </v-icon>
                </v-btn>
                <v-avatar tile style="border: 1px solid #e0e0e0">{{
                  articulo.cantidad
                }}</v-avatar>
                <v-btn @click="agregarCantidad(articulo.id)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-col cols="6" class="d-flex flex-column">
            <v-row
              ><span class="mx-auto font-weight-bold">Subtotal</span></v-row
            >
            <v-row class="text-h5">
              <span class="mx-auto">$ {{ articulo.subTotal }} </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        v-for="(articulo, index) in carrito"
        :key="articulo.id + '-t'"
        class="my-2 d-none d-sm-flex d-md-none"
      >
        <v-row>
          <v-col sm="4">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-img
                :src="articulo.imagen"
                height="150"
                width="150"
                class="mx-auto my-auto rounded"
              ></v-img>
            </router-link>
          </v-col>
          <v-col sm="8">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none black--text"
            >
              <v-row class="mr-auto mt-2">{{
                articulo.titulo.substring(0, 49).concat("...")
              }}</v-row>
            </router-link>
            <v-row class="mt-2">${{ articulo.precio }}</v-row>
            <v-row class="text-caption font-weight-light d-flex aling-center">
              <span>Vendedor :</span>
              <v-chip small pill class="mx-1">
                <v-icon small>mdi-account</v-icon>
                <span>{{ articulo.vendedor }}</span>
              </v-chip>
              <span>Tel: {{ articulo.telefono }}</span>
              <span class="ml-3">
                Estado : {{ articulo.estado ? "Nuevo" : "Usado" }}</span
              >
            </v-row>
            <v-row>
              <v-col cols="6" class="d-flex flex-column">
                <v-row
                  ><span class="mx-auto font-weight-bold">Cantidad</span></v-row
                >
                <v-row>
                  <v-btn-toggle class="mx-auto">
                    <v-btn
                      :class="{ red: articulo.cantidad == 1 }"
                      :dark="articulo.cantidad == 1"
                      @click="quitar(articulo.id, index)"
                    >
                      <v-icon v-if="articulo.cantidad > 1" dark>
                        mdi-minus
                      </v-icon>
                      <v-icon v-else color="white">
                        mdi-trash-can-outline
                      </v-icon>
                    </v-btn>
                    <v-avatar tile style="border: 1px solid #e0e0e0">{{
                      articulo.cantidad
                    }}</v-avatar>
                    <v-btn @click="agregarCantidad(articulo.id)">
                      <v-icon>mdi-plus  </v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
              </v-col>
              <v-col cols="6" class="d-flex flex-column">
                <v-row>
                  <span class="mx-auto font-weight-bold">Subtotal</span>
                </v-row>
                <v-row class="text-h5">
                  <span class="mx-auto">$ {{ articulo.subTotal }} </span>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        v-for="(articulo, index) in carrito"
        :key="articulo.id"
        class="my-2 d-none d-md-flex"
      >
        <v-row>
          <v-col cols="3">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-img
                :src="articulo.imagen"
                height="175"
                width="175"
                class="mx-auto my-auto rounded"
              ></v-img>
            </router-link>
          </v-col>
          <v-col md="5" class="pt-8">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-row class="text-h6 black--text">{{ articulo.titulo }}</v-row>
            </router-link>
            <v-row
              class="text-caption font-weight-light d-flex aling-center pt-4"
            >
              <span>Vendedor: </span>
              <v-chip small pill class="mx-1">
                <v-icon>mdi-account</v-icon>
                <span>{{ articulo.vendedor }}</span>
              </v-chip>
              <span>Telefono: {{ articulo.telefono }}</span>
            </v-row>
            <v-row class="text-caption font-weight-light pt-1">
              Estado : {{ articulo.estado ? "Nuevo" : "Usado" }}
            </v-row>
            <v-row class="mt-2 text-subtitle-1">$ {{ articulo.precio }}</v-row>
          </v-col>
          <v-col md="2" >
            <v-row class="mt-2"
              ><span class="mx-auto font-weight-bold">Cantidad</span></v-row
            >
            <v-row class="mt-7">
              <v-btn-toggle class="mx-auto">
                <v-btn
                  :class="{ red: articulo.cantidad == 1 }"
                  :dark="articulo.cantidad == 1"
                  @click="quitar(articulo.id, index)"
                >
                  <v-icon v-if="articulo.cantidad > 1"> mdi-minus </v-icon>
                  <v-icon v-else color="white"> mdi-trash-can-outline </v-icon>
                </v-btn>
                <v-avatar tile style="border: 1px solid #e0e0e0">{{
                  articulo.cantidad
                }}</v-avatar>
                <v-btn @click="agregarCantidad(articulo.id)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-col md="2" class="d-flex flex-column mt-5">
            <v-row
              ><span class="mx-auto font-weight-bold">Subtotal</span></v-row
            >
            <v-row class="text-h5">
              <span class="mx-auto">$ {{ articulo.subTotal }} </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="carrito.length == 0">
        <v-row class="mx-0">
          <v-col cols="12" class="text-center text-h5">
            Todavia no has agregado productos a tu carrito.
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn color="red accent-4" dark to="/">
            <span>Ir a comprar</span>
            <v-icon>mdi-cash-shopping-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-if="carrito.length > 0">
        <v-row class="mx-0 mt-1">
          <v-col
            cols="12"
            sm="6"
            class="text-h6 text-uppercase"
            :class="{ 'text-center': $vuetify.breakpoint.xsOnly }"
          >
            Total a Pagar: $ {{ totalAPagar }}
          </v-col>
          <v-col cols="12" sm="6" class="text-center">
            <v-btn
              to="/"
              color="red accent-4"
              :class="$vuetify.breakpoint.xsOnly ? 'mb-2' : 'mr-5'"
              dark
              :block="$vuetify.breakpoint.xsOnly"
            >
              <span>Ir a comprar</span>
              <v-icon>mdi-cash-shopping-outline</v-icon>
            </v-btn>
            <v-btn color="blue-grey" dark :block="$vuetify.breakpoint.xsOnly" to="/">
              Finalizar la compra
              <v-icon class="ml-3">mdi-basket-check-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Carrito",
  data: () => {
    return {
      subTotal: [],
      carritoLocal: [],
    };
  },
  methods: {
    ...mapMutations(["agregarCantidad", "quitarCantidad", "quitarArticulo"]),
    quitar(id, index) {
      if (this.carrito[index].cantidad > 1) {
        this.quitarCantidad(id);
      } else {
        this.quitarArticulo(index);
      }
    },
  },
  computed: {
    ...mapState(["carrito"]),
    totalAPagar() {
      var total = 0;
      this.carrito.forEach((item) => {
        total = total + item.cantidad * item.precio;
      });
      return parseFloat(Math.round(total * 100) / 100).toFixed(2);
    },
  },
};
</script>
