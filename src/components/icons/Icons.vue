<template>
  <div>
    <Breadcrumb
      :route="{ name: 'icons' }"
      :is-active="true"
      icon-class="fas fa-icons"
      currentPage="Icons"
    ></Breadcrumb>

    <!-- Icons Section Start -->
    <section class="categories-section row justify-content-center py-4">
      <div class="col-md-9 col-lg-12 px-3 px-lg-5">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">
            Total icons: {{ iconsCount }}
            <a
              href="#"
              role="button"
              class="float-end ms-4 btn btn-primary rounded"
              @click.prevent="addIcon"
            >
              <i class="fas fa-plus me-1"></i>
              <span>Add Icon</span>
            </a>
          </h5>
          </div>
          <div class="card-body d-flex flex-wrap p-2 my-3" v-if="icons.length">
            <span
              class="
                d-flex
                flex-column
                align-items-center
                mb-3
                mx-2
                border border-secondary
                px-2
                py-2
              "
              v-for="icon in icons"
              :key="icon.id"
            >
              <i
                :class="`cat-icon ${icon.class} mx-2 my-2`"
                :style="{ backgroundColor: icon.color }"
              ></i>

              <i
                class="fas fa-edit"
                style="cursor: pointer"
                @click="editIcon(icon.id, icon.class, icon.color)"
              ></i>
            </span>
          </div>
          <p class="text-center text-muted mt-5 w-100" v-else>No Icon</p>
        </div>
      </div>
    </section>
    <!-- Icons Section End -->

    <div class="modal" ref="iconModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="ps-3 py-3">
            <h5 class="modal-title text-center">Add Icon</h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="class">Icon Class</label>
                <input
                  type="text"
                  v-model="v$.iconClass.$model"
                  id="class"
                  placeholder="Enter Fontawesome Icon Class"
                  class="form-control"
                  autocomplete="off"
                />
                <template v-if="v$.iconClass.$dirty">
                  <small
                    class="form-text error"
                    v-if="v$.iconClass.required.$invalid"
                    >Icon Class is required</small
                  >
                </template>
              </div>
              <div class="mb-3">
                <label for="color">Icon Color</label>
                <input
                  type="color"
                  v-model="v$.iconColor.$model"
                  id="color"
                  placeholder="Enter Icon Color code"
                  class="form-control"
                  autocomplete="off"
                />
                <template v-if="v$.iconColor.$dirty">
                  <small
                    class="form-text error"
                    v-if="v$.iconColor.required.$invalid"
                    >Icon Color is required</small
                  >
                </template>
              </div>
            </form>
          </div>
          <div class="text-end pt-2 pb-3 pe-3">
            <button class="btn btn-secondary" @click="hideModal">Cancel</button>
            <button
              class="ms-3 btn btn-primary"
              @click="submitForm"
              :disabled="v$.$invalid"
            >
              {{ editMode ? "Update" : "Add" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../../store/store";
import { Modal } from "bootstrap";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      iconClass: { required },
      iconColor: { required },
    };
  },
  data() {
    return {
      modal: null,
      editMode: false,
      iconClass: "",
      iconColor: "",
    };
  },
  computed: {
    ...mapGetters(["icons", "iconsCount"]),
  },
  methods: {
    addIcon() {
      this.editMode = false;
      this.showModal = true;
      this.modal.show();
    },
    editIcon(id, iconClass, iconColor) {
      this.editMode = true;
      this.iconClass = iconClass;
      this.iconColor = iconColor;
      this.modal.show();
    },
    hideModal() {
      this.editMode = false;
      this.modal.hide();
    },
    submitForm() {
      const iconClass = this.iconClass;
      const iconColor = this.iconColor;

      if (this.editMode) {
        return;
      }
      this.$store
        .dispatch("storeIcon", { iconClass, iconColor })
        .then((res) => {
          this.editMode = false;
          this.modal.hide();
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.iconModal, {});
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch("fetchIcons")
      .then((res) => next())
      .catch((err) => console.log(err));
  },
};
</script>
<style scoped>
</style>