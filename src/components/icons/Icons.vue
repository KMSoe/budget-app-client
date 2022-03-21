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
        <h3 class="">
          Icons
          <a
            href="#"
            role="button"
            class="float-end ms-4 btn btn-primary rounded"
            @click.prevent="addIcon"
            data-bs-toggle="modal"
          >
            <i class="fas fa-plus me-1"></i>
            <span>Add Icon</span>
          </a>
        </h3>
        <div class="d-flex flex-wrap p-2 my-3" v-if="icons.length">
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
              @click="editIcon(icon.id)"
            ></i>
          </span>
        </div>
        <p class="text-center text-muted mt-5 w-100" v-else>No Icon</p>
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
                  name=""
                  id="class"
                  placeholder="Enter Fontawesome Icon Class"
                  class="form-control"
                  autocomplete="off"
                />
              </div>
              <div class="mb-3">
                <label for="class">Icon Color</label>
                <input
                  type="color"
                  name=""
                  id="class"
                  placeholder="Enter Icon Color code"
                  class="form-control"
                  autocomplete="off"
                />
              </div>
            </form>
          </div>
          <div class="text-end pt-2 pb-3 pe-3">
            <button class="btn btn-secondary" @click="hideModal">Cancel</button>
            <button class="ms-3 btn btn-primary">
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

export default {
  data() {
    return {
      modal: null,
      editMode: false,
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(["icons"]),
  },
  methods: {
    addIcon() {
      this.editMode = false;
      this.showModal = true;
      this.modal.show();
    },
    editIcon(id) {
      this.editMode = true;
      this.showModal = true;
    },
    hideModal() {
      this.editMode = false;
      this.modal.hide();
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