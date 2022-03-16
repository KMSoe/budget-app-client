<template>
  <div
    class="col-lg-6 categories-container"
    :id="id"
    :class="{ show: activeView }"
  >
    <h5 class="mb-3 ps-5">{{ categoryData.type }} Categories</h5>
    <ul class="categories pe-4" v-if="categoryData.data.length">
      <li class="d-flex py-2" v-for="cat in categoryData.data" :key="cat.id">
        <i
          :class="`cat-icon ${cat.icon.class} me-3 my-auto`"
          :style="{
            backgroundColor: cat.icon.color,
          }"
        ></i>
        <span class="flex-fill my-auto pe-4 pe-lg-0 text-center">{{
          cat.name
        }}</span>

        <form class="mt-2" style="box-sizing: border-box">
          <button
            type="submit"
            class="text-white my-auto"
            style="outline: none; border: none; background-color: unset"
          >
            <i class="fas fa-times-circle"></i>
          </button>
        </form>
      </li>
    </ul>
    <p class="text-center text-muted mt-5" v-else>No category</p>

    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    activeView: {
      type: Boolean,
      required: true,
    },
    categoryData: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
ul.categories li {
  color: var(--text-color);
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s ease;
}
ul.categories li:last-of-type {
  border: 0;
}
</style>