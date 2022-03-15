<template>
  <div class="col-lg-6 categories-container">
    <h5 class="mb-3 ps-5">{{ categoryData.type }} Categories</h5>
    <ul class="categories pe-4" v-if="categoryData.data.length">
      <li class="d-flex py-2" v-for="cat in categoryData.data" :key="cat.id">
        <i
          :class="`cat-icon ${cat.class} me-3 my-auto`"
          :style="{
            backgroundColor: cat.color,
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

    <a href="#" class="my-3 ms-4 btn bg-plus text-white">
      <i class="fas fa-plus"></i>
      <span class="">Add Income Category</span>
    </a>
  </div>
</template>
<script>
export default {
  props: {
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
  border-bottom: 1px solid #3f3f3f;
  transition: background-color 0.3s ease;
}
ul.categories li:last-of-type {
  border: 0;
}
ul.categories li:hover {
  background-color: #3f3f3f;
}
i.cat-icon {
  color: var(--text-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
}
i.cat-icon::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>