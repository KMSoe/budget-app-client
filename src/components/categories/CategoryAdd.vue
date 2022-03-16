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
    
    
  </div>
</template>
<script>
export default {
  computed: {
    type() {
      const type = this.$route.params.type;
      return `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    },
  },
};
</script>