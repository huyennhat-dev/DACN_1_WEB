<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement
);

export default {
  components: { Line },

  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
