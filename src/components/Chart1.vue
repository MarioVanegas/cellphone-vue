<script>
import { HorizontalBar } from "vue-chartjs";
export default {
  name: "BarChart",
  extends: HorizontalBar,
  data() {
    return {
      chartdata: {
        labels: [
          "Xiaomi",
          "Apple",
          "Huawei",
          "Samsung",
          "Google",          
          "Nokia",        
          "Oppo",
          "Otro",
        ],
        datasets: [
          {
            label: "Top Marcas Vendidas",
            borderColor: [
              "#7fc340",
              "#e0cb11",
              "#6a0590",
              "#4362cb",
              "#87b8cf",              
              "#ae90a8",          
              "#f26fd8",
              "#dec89f",
            ],
            borderWidth: 2,
            backgroundColor: [
              "rgba(127, 195, 64, 0.5)",
              "rgba(224, 203, 17, 0.5)",
              "rgba(106, 5, 144, 0.5)",
              "rgba(67, 98, 203, 0.5)",
              "rgba(135, 184, 207, 0.5)",             
              "rgba(174, 144, 168, 0.5)",             
              "rgba(242, 111, 216, 0.5)",
              "rgba(222, 200, 159, 0.5)",
            ],
            data: [99, 92, 82, 78, 67, 56, 45, 30, 23, 8],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Miles",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Marcas",
              },
            },
          ],
        },
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
