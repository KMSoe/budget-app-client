<template>
  <div>
    <Breadcrumb
      :route="{ name: 'statistics' }"
      :is-active="true"
      icon-class="fas fa-chart-line"
      currentPage="Statistics"
    ></Breadcrumb>
  
  <!-- income-expense-yearly Section Start -->
  <section class="income-expense-yearly-section py-3 px-1 px-lg-3 px-xl-4">
    <div class="mb-4">
      <a
        href="#"
        role="button"
        class="btn bg-primary text-white py-1 px-3 my-2"
        id="pick-month-btn"
        style="border-radius: 12px"
      >
        <i class="fas fa-calendar-alt me-2"></i>
        <span id="year-month"> 2022 </span>
      </a>
      
      <h3 class="my-4">Monthly Financial Graph</h3>
      <canvas id="income-expense-multi-line" style="height: 300px"></canvas>
    </div>
  </section>
  </div>
</template>
<script>
import { ref } from "vue";
import { LineChart, PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
export default {
  data() {
    return {
      year: ref(new Date()),
    };
  },
  computed: {
    selectedYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    changeYear() {
      console.log("Year changed");
    },
  },
  created() {
    console.log(this.selectedYear);
  },
};
</script>