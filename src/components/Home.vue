<template>
  <div class="row">
    <div class="col-lg-8">
      <budget-brief :brief="brief"></budget-brief>
      <budget-daily :cards="cards"></budget-daily>
    </div>
    <div class="col-lg-4">
      <section class="py-3">
        <div class="row">
          <div class="col-sm-10 col-md-8 col-lg-12 mx-auto">
            <div class="pt-5 pb-3 ps-2 mobile-sticky-nav bg-main">
              <h4>Financial Amount Detail on Category</h4>
              <div
                class="swip-nav d-flex justify-content-flex-start mt-4 mb-md-3"
              >
                <button
                  class="btn btn-secondary me-2 select-btn income-nav"
                  :class="{ active: activeDetail == 'income' }"
                  @click="swapBudgetDetail('income')"
                >
                  <i
                    class="fas fa-check me-2"
                    v-if="activeDetail == 'income'"
                  ></i
                  >Income
                </button>
                <button
                  class="btn btn-secondary select-btn expense-nav"
                  :class="{ active: activeDetail == 'expense' }"
                  @click="swapBudgetDetail('expense')"
                >
                  <i
                    class="fas fa-check me-2"
                    v-if="activeDetail == 'expense'"
                  ></i
                  >Expense
                </button>
              </div>
            </div>
            <budget-detail
              :active="activeDetail"
              :total="total"
              :items="details"
              :graph-data="chartData"
            ></budget-detail>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BudgetBrief from "./budgets/BudgetBrief.vue";
import BudgetDaily from "./budgets/BudgetDaily/BudgetDaily.vue";
import BudgetDetail from "./budgets/BudgetDetail.vue";

export default {
  components: {
    "budget-brief": BudgetBrief,
    "budget-daily": BudgetDaily,
    "budget-detail": BudgetDetail,
  },
  data() {
    return {
      activeDetail: "income",
    };
  },
  computed: {
    ...mapGetters({
      brief: "monthlyBrief",
      cards: "dailyCards",
      incomeDetails: "monthlyIncomeDetail",
      expenseDetails: "monthlyExpenseDetail",
      incomeChart: "monthlyIncomeGraph",
      expenseChart: "monthlyExpenseGraph",
    }),
    total() {
      if (this.activeDetail == "income") {
        return this.brief.income ?? 0;
      } else if (this.activeDetail == "expense") {
        return this.brief.expense ?? 0;
      }
    },
    details() {
      if (this.activeDetail == "income") {
        return this.incomeDetails;
      } else if (this.activeDetail == "expense") {
        return this.expenseDetails;
      }
    },
    chartData() {
      if (this.activeDetail == "income") {
        return this.incomeChart;
      } else if (this.activeDetail == "expense") {
        return this.expenseChart;
      }
    },
  },
  methods: {
    swapBudgetDetail(type) {
      this.activeDetail = type;
    },
  },
  created() {
    this.$store.dispatch("featchMonthlyBudgets");
  },
};
</script>
<style>
.select-btn {
  border-radius: 12px !important;
}
.income-nav.active {
  background-color: var(--plus-color) !important;
}
.expense-nav.active {
  background-color: var(--minus-color) !important;
}
</style>