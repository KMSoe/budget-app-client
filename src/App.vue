<template>
  <quote>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque optio laboriosam officiis accusamus consectetur earum culpa, deleniti magnam perferendis porro pariatur corporis ipsa aspernatur aut architecto adipisci, sunt suscipit.
    </p>
  </quote>
</template>

<script>
import Quote from './components/Quote.vue'

export default {
  data() {
    return {
      name: "Kaung Myat Soe",
    };
  },
  components: {
    quote : Quote,
  }
};
</script>


