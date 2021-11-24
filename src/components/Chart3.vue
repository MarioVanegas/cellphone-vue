<script>
import { Radar } from "vue-chartjs";
export default {
  name: "RadarChart",
  extends: Radar,
  data: function () {
    return {
      chartdata: {
        labels: [
          "Diseño",
          "Pantalla",
          "Rendimiento",
          "Camaras",
          "Audio",
          "Bateria",
          "Caracteristicas",
        ],
        datasets: [
          {
            label: "Xiaomi redmi note 10 pro",
            data: [74, 57, 94, 80, 33, 96, 99],
            borderColor: "rgba(102,0,204,1)",
            borderWidth: 2,
            backgroundColor: "rgba(102,0,204,0.5)",
            pointHitRadius: 5,
          },
          {
            label: "Iphone 13 Pro max",
            data: [75, 74, 75, 85, 42, 73, 79],
            borderColor: "rgba(255,0,127,1)",
            borderWidth: 2,
            backgroundColor: "rgba(255,0,127,0.5)",
            pointHitRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
