<template>
  <div class="col-12 col-xl-6 my-auto">
    <div class="row">
      <h5 class="text-center mb-4">Financial Progress Bar</h5>
      <div
        class="
          d-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <div
          class="total-amount-progress progress mb-4 mt-2"
        >
          <div
            class="progress-bar bg-minus" :style="{width: `${brief.percentage}%`}"
          ></div>
        </div>
        <div class="text-center text-md-start text-xl-center">
          <p v-if="brief.income == 0 && brief.expense == 0">
            You have No Income, Expense.
          </p>
          <p v-else-if="brief.income == 0">You have No Income.</p>
          <p class="font-weight-bold" v-else>
            <i class="fas fa-chart-line me-2"></i>
            You have spent <b><em>{{ brief.percentage }}</em></b>&percnt; of your Income in
            <b><em>{{ brief.year }}</em></b>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    brief: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
.total-amount-progress {
    width: 75%;
    background-color: var(--bg-color);
    border: 3px solid var(--border-color);
    height: 25px;
}
</style>