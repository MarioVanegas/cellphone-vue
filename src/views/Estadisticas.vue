<template>
  <div class="Estadisticas">
    <v-container>
      <h1>Estadísticas de Cellphone: </h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="justify-center">
             Publicaciones semanales
            </v-card-title>
            <v-card-text>
              <BarChart />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="justify-center">
              Celulares mas vendidos
            </v-card-title>
            <v-card-text>
              <RadarChart />
            </v-card-text>
          </v-card>
        </v-col>        
        <v-col cols="12">
          <v-card>
            <v-card-title class="justify-center">
              Marcas mas vendidas
            </v-card-title>
            <v-card-text>
              <LineChart />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LineChart from "../components/Chart1.vue";
import BarChart from "../components/Chart2.vue";
import RadarChart from "../components/Chart3.vue";

export default {
  name: "Estadisticas",
  components: {
    LineChart,
    BarChart,
    RadarChart,
    
  },
  data: function() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>