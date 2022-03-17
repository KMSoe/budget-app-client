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
        <canvas id="income-expense-multi-line" style="height: 300px"></canvas>
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
import StatisticsDetail from './StatisticsDetail.vue';
import ProgressBar from "./ProgressBar.vue";
import { mapGetters, useStore } from "vuex";

export default {
  components: {
    Calendar,
    "budget-table": BudgetTable,
    ProgressBar,
    StatisticsDetail
  },
  data() {
    return {
      year: this.selectedYear,
    };
  },
  computed: {
    ...mapGetters({
      brief: "yearlyBrief",
      table: "yearlyTable",
      incomeDetails: "yearlyIncomeDetail",
      expenseDetails: "yearlyExpenseDetail",
    }),
    yearNumber() {
      return this.year.getFullYear();
    },
    date() {
      return new Date();
    },
  },
  watch: {
    year(newVal, oldVal) {
      this.$store.commit("SET_YEAR", newVal);
    },
  },
  created() {
    this.$store.dispatch("fetchStatisticsData");
    this.year = this.$store.getters.selectedYear;
  },
};
</script>