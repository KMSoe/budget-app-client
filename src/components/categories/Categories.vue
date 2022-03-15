<template>
  <div>
    <Breadcrumb
      :route="{ name: 'categories' }"
      :is-active="true"
      icon-class="fas fa-th-large"
      currentPage="Categories"
    ></Breadcrumb>

    <section class="categories-section justify-content-center py-4">
      <h3 class="text-center">Categories</h3>
      <div class="col-md-9 col-lg-12 px-3 px-lg-5">
        <div class="swip-nav d-lg-none d-flex justify-content-center my-3">
          <a class="income-nav active btn select-btn text-white me-3 py-1 px-3">
            <i class="fas fa-check me-2"></i>Income
          </a>
          <a class="expense-nav btn select-btn text-white me-3 py-1 px-3">
            <i class="fas fa-check me-2"></i>Expense
          </a>
        </div>
        <div class="row mt-5">
            <category-list :categoryData="incomeCategoryData"></category-list>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CategoryList from "./CategoryList.vue";

export default {
  components: {
    "category-list": CategoryList,
  },
  computed: {
    ...mapGetters(["incomeCategories", "expenseCategories"]),
    incomeCategoryData() {
      return { type: "Income", data: this.incomeCategories };
    },
    expenseCategoryData() {
      return { type: "Expense", data: this.expenseCategories };
    },
  },
};
</script>
<style>
</style>