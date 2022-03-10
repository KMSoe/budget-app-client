<template>
  <div>
    <Breadcrumb
      :route="{ name: 'budget-add', params: { type } }"
      :is-active="true"
      icon-class="fas fa-plus-circle"
      :currentPage="`Add ${type}`"
    ></Breadcrumb>
    <section class="add-budget-section row justify-content-center pt-1 pb-4">
      <div class="col-sm-11 col-md-8 col-lg-7 col-xl-6 px-4">
        <h4 class="text-center mb-4">
          <i
            :class="`fas fa-dollar-sign me-2 ${
              type === 'Income' ? 'plus' : 'minus'
            }`"
          ></i>
          Add {{ type }}
        </h4>
        <form class="add-item-form">
          <input type="hidden" name="type" v-model="type" />
          <div class="row g-0 mb-3">
            <div class="col-sm-3 my-auto">
              <i class="fas fa-calendar-alt me-1"></i>
              <label for="date" class="">Date</label>
            </div>
            <div class="col-sm-9 form-group position-relative">
              <Datepicker v-model="date" datepicker />
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-sm-3 my-auto">
              <i class="fas fa-th-large me-1"></i>
              <label for="category-id" class="">Category</label>
            </div>
            <div class="col-sm-9">
              <select
                id="category-id"
                name="category_id"
                class="w-100 form-select"
              >
                <option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                  :style="{ backgroundColor: cat.icon.color }"
                  class="text-white"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-sm-3 my-auto">
              <i class="fas fa-pen me-1"></i>
              <label for="remark" class="">Remark</label>
              <br class="d-none d-md-inline-block" />&nbsp;
            </div>
            <div class="col-sm-9">
              <input
                type="text"
                id="remark"
                name="remark"
                class="form-control d-inline-block"
                placeholder="Write remark"
              />
              <span class="text-muted">Optional</span>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-sm-3 my-auto">
              <i class="fas fa-dollar-sign me-1"></i>
              <label for="amount" class="">Amount</label>
            </div>
            <div class="col-sm-9">
              <div class="input-group">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  class="form-control d-inline-block"
                  step=".0001"
                  placeholder="Enter Amount"
                />
                <span class="input-group-text">ks</span>
              </div>
            </div>
          </div>
          <div class="row g-0 my-3">
            <div class="col-sm-3"></div>
            <div class="col-sm-9">
              <button
                type="submit"
                :class="`btn rounded mt-3 ${
                  type === 'Income' ? 'btn-primary' : 'btn-danger'
                }`"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const date = ref(new Date());
    return {
      date,
    };
  },
  computed: {
    type() {
      const type = this.$route.params.type;
      return `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    },
    categories() {
      if (this.type == "Income") {
        return this.$store.getters.incomeCategories;
      } else {
        return this.$store.getters.expenseCategories;
      }
    },
  },
  created() {
    this.$store.dispatch("fetchCategories", this.type);
  },
};
</script>