<template>
  <div>
    <Breadcrumb
      :route="{ name: 'profile' }"
      :is-active="true"
      icon-class="fas fa-user"
      currentPage="Profile"
    ></Breadcrumb>
    <section class="yearly-balance-section my-5">
      <div class="container">
        <div class="col-lg-8 mx-auto">
          <article
            class="py-4"
            v-for="(yearlyResult, index) in results"
            :key="index"
          >
            <h5 class="mb-2 pe-1 font-weight-bold">
              {{ yearlyResult.brief.year }}
              <span
                class="d-inline-block float-end"
                :class="[yearlyResult.brief.net_budget >= 0 ? 'plus' : 'minus']"
                >{{ yearlyResult.brief.net_budget > 0 ? "+" : "" }}
                {{ yearlyResult.brief.net_budget }}</span
              >
            </h5>
            <budget-table
              :yearly-brief="yearlyResult.brief"
              :monthly-results="yearlyResult.monthlyResults"
            ></budget-table>
            <a href="/" class="btn btn-primary text-white rounded">See Detail</a>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BudgetTable from "./budgets/BudgetYearlyTable.vue";

export default {
  components: {
    "budget-table": BudgetTable,
  },
  computed: {
    ...mapGetters({ results: "profileResults" }),
  },
  created() {
    this.$store.dispatch("loadProfile");
  },
};
</script>