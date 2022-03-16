<template>
  <section class="breadcrumb-section pt-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 col-lg-10">
          <ol class="breadcrumb px-2 py-3 mx-3 mb-3">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'home' }"
                ><i class="fas fa-home me-2"></i>Home</router-link
              >
            </li>
            <li
              :class="[isActive ? 'breadcrumb-item active' : 'breadcrumb-item']"
            >
              <router-link :to="route"
                ><i :class="`${iconClass} me-2`"></i>
                {{ currentPage }}</router-link
              >
            </li>
            <slot></slot>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    route: {
      type: Object,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    currentPage: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.breadcrumb {
  background-color: var(--bg-breadcrumb);
}
.breadcrumb-item + .breadcrumb-item::before {
  color: var(--text-color);
  font-weight: bold;
}
.breadcrumb-item a {
  font-weight: bold;
  letter-spacing: 1px;
  color: #1da1f2 !important;
}
.breadcrumb-item.active a {
  color: var(--text-color) !important;
}
</style>
