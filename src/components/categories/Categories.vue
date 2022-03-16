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
      <div class="col-md-9 col-lg-12 px-3 px-lg-5 mx-auto">
        <div class="d-lg-none d-flex justify-content-center my-4">
          <a
            class="income-nav btn btn-secondary me-2 select-btn"
            role="button"
            :class="{ active: activeCategoryView == 'income' }"
            :disabled="activeCategoryView == 'income'"
            @click="swapCategoryView('income')"
          >
            <i class="fas fa-check me-2"></i>Income
          </a>
          <a
            class="expense-nav btn btn-secondary me-2 select-btn"
            role="button"
            :class="{ active: activeCategoryView == 'expense' }"
            :disabled="activeCategoryView == 'expense'"
            @click="swapCategoryView('expense')"
          >
            <i class="fas fa-check me-2"></i>Expense
          </a>
        </div>
        <div class="row mt-5">
          <category-list
            id="income-categories-container"
            :active-view="activeCategoryView == 'income'"
            :categoryData="incomeCategoryData"
          >
            <router-link
              :to="{ name: 'categories-add', params: { type: 'income' } }"
              class="my-3 ms-4 btn rounded bg-plus text-white"
            >
              <i class="fas fa-plus me-2"></i>
              <span>Add Income Category</span>
            </router-link>
          </category-list>
          <category-list
            id="expense-categories-container"
            :active-view="activeCategoryView == 'expense'"
            :categoryData="expenseCategoryData"
          >
            <router-link
              :to="{ name: 'categories-add', params: { type: 'expense' } }"
              class="my-3 ms-4 btn rounded bg-minus text-white"
            >
              <i class="fas fa-plus me-2"></i>
              <span>Add Expense Category</span>
            </router-link>
          </category-list>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CategoryList from "./CategoryList.vue";
import $ from "jquery";

export default {
  components: {
    "category-list": CategoryList,
  },
  data() {
    return {
      activeCategoryView: "income",
    };
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
  methods: {
    swapCategoryView(category) {
      this.activeCategoryView = category;
      // if(category == 'income') {
      //   $('#income-categories-container').toggleClass('show');
      // }else if(category == 'expense') {
      //   $('#expense-categories-container').toggleClass('show');
      // }
    },
  },
};
</script>
<style scoped>
#income-categories-container,
#expense-categories-container {
  display: none;
}
#income-categories-container.show,
#expense-categories-container.show {
  display: block;
}
@media screen and (min-width: 992px) {
  #income-categories-container,
  #expense-categories-container {
    display: block;
  }
}
</style>