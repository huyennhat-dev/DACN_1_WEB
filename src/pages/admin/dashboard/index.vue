<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="p-2 border border-secondary brr-5">
          <bar-chart :chartData="soldOutData" :chartOptions="soldOutOptions" />
          <div class="mx-1 my-2 text-center">
            <span class="fs-small fw-medium text-secondary fst-italic">
              Biểu đồ doanh số bán ra theo từng tháng
            </span>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="p-2 border border-secondary brr-5">
          <bar-chart :chartData="soldOut2Data" :chartOptions="soldOutOptions" />
          <div class="mx-1 my-2 text-center">
            <span class="fs-small fw-medium text-secondary fst-italic">
              Biểu đồ lượt truy cập theo từng tháng
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <div class="border border-secondary brr-5">
          <line-chart :chartData="lineData" :chartOptions="lineOptions" />
          <div class="mx-1 my-2 text-center">
            <span class="fs-small fw-medium text-secondary fst-italic">
              Biểu đồ doanh số bán ra theo tường loại sách
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMenuStore } from "../../../store/menu.js";
import BarChart from "./components/bar_chart.vue";
import LineChart from "./components/line_chart.vue";

export default defineComponent({
  components: {
    BarChart,
    LineChart,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-dashboard"]);
  },
  data() {
    return {
      months: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    };
  },
  computed: {
    soldOutData() {
      return {
        labels: this.months,
        datasets: [
          {
            label: "Doanh số bán ra",
            data: [100, 80, 120, 90, 110, 70, 130, 100, 120, 80, 100, 90],
            backgroundColor: "#ff4d4f",
            fill: false,
          },
        ],
      };
    },
    soldOut2Data() {
      return {
        labels: this.months,
        datasets: [
          {
            label: "Lượt truy cập",
            data: [100, 80, 120, 90, 110, 170, 130, 100, 120, 100, 160, 290],
            backgroundColor: "#50ACFB",
          },
        ],
      };
    },
    soldOutOptions() {
      return {
        responsive: true,
      };
    },
    lineData() {
      return {
        labels: this.months,

        datasets: [
          {
            label: "Sách Công Nghệ Thông Tin",
            data: [120, 130, 110, 150, 140, 160, 120, 130, 140, 110, 130, 120],
            borderColor: "rgba(255, 99, 132, 1)",
            fill: false,
          },
          {
            label: "Sách Kinh Tế",
            data: [200, 190, 210, 220, 190, 200, 210, 180, 220, 200, 210, 190],
            borderColor: "rgba(54, 162, 235, 1)",
            fill: false,
          },
          {
            label: "Sách Khoa Học - Kỹ Thuật",
            data: [150, 160, 170, 150, 180, 160, 170, 190, 160, 180, 170, 150],
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
          {
            label: "Sách Tư Duy Kĩ Năng Sống",
            data: [180, 170, 190, 200, 180, 210, 200, 190, 210, 200, 190, 180],
            borderColor: "rgba(255, 205, 86, 1)",
            fill: false,
          },
        ],
      };
    },
    lineOptions() {
      return {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Thời gian",
            },
          },
          y: {
            title: {
              display: true,
              text: "Bán ra",
            },
          },
        },
      };
    },
  },
});
</script>

<style></style>
