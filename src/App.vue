<template>
  <main>
    <sidebar v-if="authenticated" sidebar-type="mobile-sidebar" :is-plus="true">
    </sidebar>

    <app-header :is-plus="true"></app-header>

    <div class="site-section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3 d-none d-lg-block" v-if="authenticated">
            <sidebar sidebar-type="desktop-sidebar" :is-plus="true"> </sidebar>
          </div>
          <div :class="[authenticated ? 'col-md-9' : 'col-md-9 mx-auto']">
            <router-view v-slot="{ Component }">
              <transition name="slide" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from "./components/partials/Header.vue";
import Sidebar from "./components/partials/Sidebar.vue";
import { mapGetters } from "vuex";

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
    ...mapGetters(["authenticated"]),
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
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
  --bg-breadcrumb: #e7e7e7;
}
.dark {
  --bg-color: #1a252f;
  --text-color: #eee;
  --bg-breadcrumb: #3f3f3f;
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
.alert {
  text-align: center;
}
.bg-plus {
  background-color: var(--plus-color);
}
.bg-minus {
  background-color: var(--minus-color);
}
.site-section {
  padding-top: 80px;
}
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>

