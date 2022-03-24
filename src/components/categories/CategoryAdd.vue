<template>
  <div>
    <Breadcrumb
      :route="{ name: 'categories' }"
      :is-active="false"
      icon-class="fas fa-th-large"
      currentPage="Categories"
    >
      <li class="breadcrumb-item active">
        <router-link :to="{ name: 'categories-add', params: { type } }"
          ><i class="fas fa-plus-circle me-2"></i>Add
          {{ type }} Category</router-link
        >
      </li>
    </Breadcrumb>
    <!-- Add Categories Section Start -->
    <section class="add-categories-section row justify-content-center">
      <div class="col-sm-11 col-md-8 col-lg-7 col-xl-6 px-4">
        <h4 class="mt-2">
          <i class="fas fa-file-invoice-dollar me-2"></i>
          {{ type }} Category
        </h4>
        <form class="my-3 py-2">
          <div class="icons-container d-flex flex-wrap p-2 mb-3 mx-auto">
            <i
              v-for="icon in icons"
              :key="icon.id"
              :class="`cat-icon ${icon.class} mx-2 my-2`"
              :style="{ backgroundColor: icon.color }"
              @click="selectIcon(icon)"
            ></i>
          </div>
          <div class="row g-0">
            <div class="col-3 input-group mb-3">
              <span class="input-group-text" id="selected-icon">
                <i
                  :class="`cat-icon ${selectedIcon.class}`"
                  :style="{
                    backgroundColor: selectedIcon.color,
                  }"
                ></i>
              </span>
            </div>
            <div class="col-9 form-floating mb-3">
              <input
                type="text"
                class="form-control mb-1"
                id="name"
                placeholder="Enter Category name"
                autocomplete="off"
              />
              <label for="name">Category Name</label>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-3"></div>
            <div class="col-9">
              <button
                class="btn text-white ms-2"
                :class="[type == 'Income' ? 'bg-plus' : 'bg-minus']"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <!-- Add Categories Section End -->
  </div>
</template>
<script>
import store from "../../store/store";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedIcon: {},
    };
  },
  computed: {
    ...mapGetters({ icons: "uncategorizedIcons" }),
    type() {
      const type = this.$route.params.type;
      return `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    },
  },
  methods: {
    selectIcon(icon) {
      console.log(icon);
      this.selectedIcon = icon;
    },
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch("fetchUnccategorizedIcons")
      .then((res) => next(vm => vm.selectIcon(res[0]) ))
      .catch((err) => console.log(err));
  },
};
</script>