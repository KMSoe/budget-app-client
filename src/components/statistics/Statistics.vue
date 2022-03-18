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
          class="btn bg-primary text-white py-1 px-3 my-2 me-2"
          id="pick-month-btn"
          style="border-radius: 12px"
        >
          <i class="fas fa-calendar-alt me-2"></i>
          <span> {{ yearNumber }} </span>
        </a>
        <Calendar v-model="year" dateFormat="yy" view="year" id="yearpicker" />
        <h3 class="my-4">Monthly Financial Graph</h3>
        <LineChart class="pie mx-auto" :chart-data="chartData" />
      </div>
      <div class="row py-3">
        <div class="col-12 col-xl-6 mb-5">
          <h5 class="mb-4">Yearly Finances in Table</h5>
          <budget-table
            :yearly-brief="brief"
            :monthly-results="table"
          ></budget-table>
        </div>
        <ProgressBar :brief="brief" />
      </div>
    </section>
    <StatisticsDetail :brief="brief" />
  </div>
</template>
<script>
import Calendar from "primevue/calendar";
import BudgetTable from "../budgets/BudgetYearlyTable.vue";
import StatisticsDetail from "./StatisticsDetail.vue";
import ProgressBar from "./ProgressBar.vue";
import { mapGetters, useStore } from "vuex";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import store from "../../store/store";

Chart.register(...registerables);

export default {
  components: {
    Calendar,
    LineChart,
    "budget-table": BudgetTable,
    ProgressBar,
    StatisticsDetail,
  },
  data() {
    return {
      year: null,
    };
  },
  computed: {
    ...mapGetters({
      brief: "yearlyBrief",
      table: "yearlyTable",
      incomeDetails: "yearlyIncomeDetail",
      expenseDetails: "yearlyExpenseDetail",
      lineGraphData: "yearlyLineGraphData",
    }),
    yearNumber() {
      return this.year.getFullYear();
    },
    date() {
      return new Date();
    },
    chartData() {
      return {
        labels: ["", ...this.lineGraphData.months],
        datasets: [
          {
            label: "Income",
            backgroundColor: "#08fa08",
            borderColor: "#08fa08",
            data: [0, ...this.lineGraphData.incomes],
          },
          {
            label: "Expense",
            backgroundColor: "#fa0808",
            borderColor: "#fa0808",
            data: [0, ...this.lineGraphData.expenses],
          },
        ],
      };
    },
  },
  watch: {
    year(newVal, oldVal) {
      this.$store.commit("SET_YEAR", newVal);
      this.$store.dispatch("fetchStatisticsData");
    },
  },
  created() {
    this.year = this.$store.getters.selectedYear;
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("fetchStatisticsData");
    setTimeout(() => next(true), 500);
  },
};
</script>