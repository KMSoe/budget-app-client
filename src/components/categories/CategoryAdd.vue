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
            <div class="col-3 input-group align-items-strenghted">
              <span class="input-group-text me-1" id="selected-icon">
                <i
                  :class="`cat-icon ${selectedIcon.class}`"
                  :style="{
                    backgroundColor: selectedIcon.color,
                  }"
                ></i>
              </span>
              <div class="col-9 form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter Category name"
                  autocomplete="off"
                  v-model="v$.name.$model"
                />
                <label for="name">Category Name</label>
              </div>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-2"></div>
            <div class="col-9">
              <template v-if="v$.name.$dirty">
                <small class="form-text error" v-if="v$.name.required.$invalid"
                  >Category Name is required</small
                >
              </template>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-3"></div>
            <div class="col-9">
              <button
                class="btn text-white ms-2"
                :class="[type == 'Income' ? 'bg-plus' : 'bg-minus']"
                @click.prevent="addCategory"
                :disabled="v$.$invalid"
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      selectedIcon: {},
      name: "",
    };
  },
  validations() {
    return {
      name: { required },
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
      this.selectedIcon = icon;
    },
    addCategory() {
      this.$store
        .dispatch("storeCategory", {
          icon_id: this.selectedIcon.id,
          type: this.type,
          name: this.name,
        })
        .then((res) => {
          this.$router.push({ name: "categories" });
          useToast().success("Category Added Successfully");
          this.name = "";
        })
        .catch((err) => useToast().error('Error'));
    },
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch("fetchUnccategorizedIcons")
      .then((res) => {
        const type = to.params.type;
        if (type == "income" || type == "expense") {
          next((vm) => vm.selectIcon(res[0]));
        } else {
          router.push({ name: from.name });
          useToast().error("Invalid URL");
        }
        
      })
      .catch((err) => useToast().error('Error'));
  },
};
</script>