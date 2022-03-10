<template>
  <div class="row">
    <div class="col-lg-8">
      <budget-brief :brief="brief"></budget-brief>
      <budget-daily :cards="cards"></budget-daily>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BudgetBrief from "./budgets/BudgetBrief.vue";
import BudgetDaily from "./budgets/BudgetDaily/BudgetDaily.vue";

export default {
  components: {
    "budget-brief": BudgetBrief,
    "budget-daily": BudgetDaily,
  },
  computed: {
    ...mapGetters({ brief: "monthlyBrief", cards: "dailyCards" }),
  },
  created() {
    const d = new Date();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    this.$store.dispatch("featchMonthlyBudgets", { month, year });
  },
};
</script>