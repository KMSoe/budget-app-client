<template>
  <main>
    <sidebar v-if="authenticated" sidebar-type="mobile-sidebar"> </sidebar>

    <app-header></app-header>

    <div class="site-section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3 d-none d-lg-block" v-if="authenticated">
            <sidebar sidebar-type="desktop-sidebar"> </sidebar>
          </div>
          <div :class="[ authenticated ? 'col-md-9' : 'col-md-9 mx-auto']">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from "./components/partials/Header.vue";
import Sidebar from "./components/partials/Sidebar.vue";
import { mapGetters } from 'vuex'

export default {
  components: {
    "app-header": Header,
    sidebar: Sidebar,
  },
  data() {
    return {
      name: "Kaung Myat Soe",
    };
  },
  computed: {
    ...mapGetters([
      'authenticated'
    ])
  }
};
</script>
<style>
:root {
  --plus-color: #08fa08;
  --minus-color: #fa0808;
}
.light {
  --bg-color: #fefefe;
  --text-color: #111;
}
.dark {
  --bg-color: #1a252f;
  --text-color: #eee;
}
body {
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  background-color: var(--bg-color);
}
p {
  font-weight: 300;
  color: var(--text-color);
}
a {
  -webkit-transition: 0.3s all ease;
  -o-transition: 0.3s all ease;
  transition: 0.3s all ease;
}
a,
a:hover {
  text-decoration: none !important;
}

.bg-plus {
  background-color: var(--plus-color);
}
.bg-minus {
  background-color: var(--minus-color);
}
.site-section{
  padding-top: 80px;
}
</style>

