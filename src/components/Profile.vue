<template>
  <div>
    <Breadcrumb
      :route="{ name: 'profile' }"
      :is-active="true"
      icon-class="fas fa-user"
      currentPage="Profile"
    ></Breadcrumb>
  </div>
</template>
<script>
export default {
  created() {},
};
</script>