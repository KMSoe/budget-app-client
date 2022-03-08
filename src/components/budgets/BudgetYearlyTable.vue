<template>
  <table class="table table-bordered text-center" id="income-expense-table">
    <thead class="thead-dark">
      <tr class="border-secondary border-bottom-0">
        <th class="border-secondary">Month</th>
        <th class="border-secondary">Income</th>
        <th class="border-secondary">Expense</th>
        <th class="border-secondary">Balance</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="table-hover"
        v-for="(result, index) in monthlyResults"
        :key="index"
      >
        <td class="text-primary font-weight-bold">
          {{ result.month }}
        </td>
        <td class="plus font-weight-bold">
          {{ result.income > 0 ? "+" : "" }}
          {{ result.income }}
        </td>
        <td class="minus font-weight-bold">
          {{ result.expense }}
        </td>
        <td :class="[ result.net_budget > 0 ? 'font-weight-bold plus' : 'font-weight-bold minus' ]">
          {{ result.net_budget > 0 ? "+" : "" }}
          {{ result.net_budget }}
        </td>
      </tr>
    </tbody>
    <tfoot class="font-weight-bold">
      <tr>
        <td>Total</td>
        <td class="plus">{{ yearlyBrief.income > 0 ? '+' : '' }} {{ yearlyBrief.income }}</td>
        <td class="minus">
          {{ yearlyBrief.expense }}
        </td>
        <td :class="[yearlyBrief.net_budget >= 0 ? 'plus' : 'minus']">
          {{ yearlyBrief.net_budget > 0 ? "+" : "" }}
          {{ yearlyBrief.net_budget }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
export default {
  props: {
    yearlyBrief: {
      type: Object,
      required: true,
    },
    monthlyResults: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
#income-expense-table,
#income-expense-table td {
  border: 1px solid #3f3f3f;
}
@media screen and (max-width: 576px) {
  #income-expense-table {
    width: 410px;
    min-width: 100%;
    font-size: 12px;
  }
}
@media screen and (max-width: 410px) {
  #income-expense-table {
    width: 330px;
  }
}
@media screen and (max-width: 330px) {
  #income-expense-table {
    width: 320px;
  }
}
</style>