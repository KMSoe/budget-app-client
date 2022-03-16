<template>
  <main>
    <sidebar
      v-if="authenticated"
      sidebar-type="mobile-sidebar"
      :is-plus="isPlus"
    >
    </sidebar>

    <app-header :is-plus="isPlus"></app-header>

    <div class="site-section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 d-none d-lg-block" v-if="authenticated">
            <sidebar
              sidebar-type="desktop-sidebar"
              :is-plus="isPlus"
            >
            </sidebar>
          </div>
          <div
            :class="[authenticated ? 'col-lg-9 mx-auto' : 'col-lg-9 mx-auto']"
          >
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
    ...mapGetters({
      authenticated: "authenticated",
      isPlus: "isPlus",
    }),
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
    setTimeout(() => {
      if (this.authenticated) {
        this.$store.dispatch("fetchCategories", "Income");
        this.$store.dispatch("fetchCategories", "Expense");
        this.$store.dispatch("featchMonthlyBudgets");
      }
    }, 1000);
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
  --border-color: #ccc;
}
.dark {
  --bg-color: #1a252f;
  --text-color: #eee;
  --bg-breadcrumb: #3f3f3f;
  --border-color: #3f3f3f;
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
  background-color: var(--plus-color) !important;
}
.bg-minus {
  background-color: var(--minus-color) !important;
}
.plus {
  color: var(--plus-color) !important;
}
.minus {
  color: var(--minus-color) !important;
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

