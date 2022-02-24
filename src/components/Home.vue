<template>
  <h1>Hello {{ name }}</h1>
  <input type="text" v-model="name">
</template>

<script>
export default {
  data() {
    return {
      name: "Kaung Myat Soe",
    };
  },
};
</script>