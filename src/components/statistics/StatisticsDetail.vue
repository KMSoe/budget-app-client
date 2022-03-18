<template>
  <section class="income-expense-category-pie-graph-section">
    <div class="row">
      <div class="col-12 my-3 pt-5 pb-3 ps-2 sticky-top" style="z-index: 1">
        <h4 class="mb-3">Financial Amount Detail on Category</h4>
        <div class="d-lg-none d-flex justify-content-start my-4">
          <a
            class="income-nav btn btn-secondary me-2 select-btn"
            role="button"
            :class="{ active: activeDetail == 'income' }"
            :disabled="activeDetail == 'income'"
            @click="swapDetailView('income')"
          >
            <i class="fas fa-check me-2" v-if="activeDetail == 'income'"></i
            >Income
          </a>
          <a
            class="expense-nav btn btn-secondary me-2 select-btn"
            role="button"
            :class="{ active: activeDetail == 'expense' }"
            :disabled="activeDetail == 'expense'"
            @click="swapDetailView('expense')"
          >
            <i class="fas fa-check me-2" v-if="activeDetail == 'expense'"></i
            >Expense
          </a>
        </div>
        <div class="row mt-2">
          <div class="col-12 col-md-6 mx-auto" id="income-details-container" :class="{show: activeDetail == 'income'}">
            <BudgetDetail
              active="income"
              :total="brief.income"
              :items="incomeDetails"
              :graph-data="incomeChart"
            />
          </div>
          <div class="col-12 col-md-6 mx-auto" id="expense-details-container" :class="{show: activeDetail == 'expense'}">
            <BudgetDetail
              active="expense"
              :total="brief.expense"
              :items="expenseDetails"
              :graph-data="expenseChart"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import BudgetDetail from "../budgets/BudgetDetail.vue";

export default {
  components: {
    BudgetDetail,
  },
  props: {
    brief: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeDetail: "income",
    };
  },
  computed: {
    ...mapGetters({
      incomeDetails: "yearlyIncomeDetail",
      expenseDetails: "yearlyExpenseDetail",
      incomeChart: "yearlyIncomeGraph",
      expenseChart: "yearlyExpenseGraph",
    }),
  },
  methods: {
    swapDetailView(type) {
      this.activeDetail = type;
    },
  },
};
</script>
<style scoped>
#income-details-container,
#expense-details-container {
  display: none;
}
#income-details-container.show,
#expense-details-container.show {
  display: block;
}
@media screen and (min-width: 992px) {
  #income-details-container,
  #expense-details-container {
    display: block;
  }
}
</style>