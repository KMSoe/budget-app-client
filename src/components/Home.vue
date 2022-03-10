<template>
  <div class="row">
    <div class="col-lg-8">
      <budget-brief :brief="brief"></budget-brief>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BudgetBrief from "./budgets/BudgetBrief.vue";

export default {
  components: {
    "budget-brief": BudgetBrief,
  },
  computed: {
    ...mapGetters({ brief: "monthlyBrief" }, { cards: "dailyCards" }),
  },
  created() {
    const d = new Date();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    this.$store.dispatch("fetchMonthlyBrief", { month, year });
    // this.$store.dispatch("fetchDailyBudgetCards", { month, year });
  },
};
</script>