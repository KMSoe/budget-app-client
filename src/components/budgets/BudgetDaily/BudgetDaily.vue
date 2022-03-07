<template>
  <!-- Daily statistics Section Start-->
  <section class="daily-stat-section py-5 px-1 px-lg-3">
    <div class="row px-2 justify-content-center justify-content-lg-start">
      <div class="col-sm-10 col-md-8 col-lg-10 col-xl-8">
        <h4 class="h5 mb-3">Daily Budgets</h4>
        <div v-if="1" class="card-container">
            <daily-card></daily-card>
            <!-- <daily-card></daily-card> -->
        </div>
        <p v-else class="text-center text-muted mt-5">
          You have neither Income nor Expense.
        </p>
      </div>
    </div>
  </section>
  <!-- Daily statistics Section End-->
</template>
<script>
import Card from './BudgetDailyCard.vue'

export default {
    components: {
        'daily-card': Card,
    }
}
</script>