<template>
  <header class="">
    <div class="container-fluid">
      <nav
        class="main-nav d-flex pe-2"
        :class="[isPlus ? 'bg-plus' : 'bg-minus']"
      >
        <div class="ms-2">
          <a
            href="#"
            role="button"
            :class="[authenticated ? '' : 'd-none']"
            class="d-lg-none js-menu-toggle text-white"
            data-bs-toggle="collapse"
            data-bs-target="#main-navbar"
          >
            <span><i class="fas fa-bars"></i></span>
          </a>

          <router-link to="/" class="navbar-brand ms-2 text-white bold">
            <b>Budget</b>
          </router-link>
        </div>

        <ul class="nav py-1" v-if="authenticated">
          <li class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src="/src/assets/kms.jpg"
                alt="Hlaine Hlaine"
                class="img-fluid"
              />
              <span
                class="username text-white px-2 py-2 d-none d-lg-inline-block"
                >Hlaine Hlaine</span
              >
            </a>

            <div
              class="dropdown-menu dropdown-menu-right bg-main"
              aria-labelledby="navbarDropdown"
            >
              <router-link class="dropdown-item" :to="{ name: 'profile' }">
                Profile
              </router-link>
              <a class="dropdown-item" href="#" role="button" @click="logout">
                Sign out
              </a>
            </div>
          </li>
        </ul>
        <ul class="nav" v-else>
          <li class="nav-item dropdown">
            <router-link
              :to="{ name: 'signin' }"
              class="nav-link text-white"
              active-class="active bg-primary rounded"
              >Signin</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <router-link
              :to="{ name: 'register' }"
              class="nav-link text-white"
              active-class="active bg-primary rounded"
              >signup</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    isPlus: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["authenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
header {
  border-bottom: 1px solid #3f3f3f;
}
.main-nav {
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.4s ease-in-out;
}
.main-nav img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.hidden {
  opacity: 0;
  transition: transform 0.4s, opacity 0.2s;
}
.visible {
  opacity: 1;
  transition: transform 0.4s, opacity 0.2s;
}
.navbar-hide {
  pointer-events: none;
  opacity: 0;
}
.main-nav ul li .badge {
  top: -10px;
}
@media screen and (max-width: 992px) {
  .main-nav {
    height: 60px;
  }
}
</style>