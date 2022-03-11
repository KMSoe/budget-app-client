<template>
  <div class="income-category-pie-container mt-5">
    <h5 class="mb-4 text-center text-md-start">
      {{ type }} amount on Category
    </h5>
    <div
      class="income-expense-pie-container position-relative mx-auto ms-md-auto"
      id="pie-small"
    >
      <canvas id="income-category-pie"></canvas>
    </div>
    <div class="mt-4">
      <template v-if="total > 0">
        <p class="text-center mx-auto">
          Total {{ type }}:
          {{ total }}
        </p>
        <ul
          class="
            income-categories
            mt-4
            ps-0
            w-100 w-md-50 w-lg-100
            px-lg-1 px-xl-3
          "
        >
          <!-- v-for -->
          <li class="d-flex py-1" v-for="(item, index) in items" :key="index">
            <i
              class="fas fa-square me-3 my-auto"
              :style="{ fontSize: 22, color: item.iconColor }"
            ></i>
            <span class="flex-fill my-auto">
              <span class="d-inline-block mb-2">{{ item.categoryName }} </span>
              <br />
              <span class="border-top border-secondary pt-2">
                {{ item.amount }}
              </span>
            </span>
            <span class="my-auto"> {{ item.percentage }}&percnt; </span>
          </li>
        </ul>
      </template>
      <p class="text-center mx-auto" v-else>You have No Income.</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    type() {
      return `${this.active.charAt(0).toUpperCase()}${this.active.slice(1)}`;
    },
  },
};
</script>
<style>
</style>