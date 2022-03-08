<template>
  <aside :class="sidebarType">
    <div class="side-inner">
      <div class="profile mx-auto text-center d-flex flex-column py-2">
        <img src="/src/assets/kms.jpg" alt="Kaung Myat" class="img-fluid" />
        <h3 class="name mb-1">Kaung Myat</h3>
        <span class="email text-muted mb-1">kaungmyatsoe.m192@gmail.com</span>
        <!-- <a href="#" class="align-self-center btn btn-primary mt-2">Profile</a> -->
      </div>

      <div class="nav-menu">
        <ul>
          <li>
            <router-link :to="{name: 'home'}" :active-class="isPlus ? 'active plus' : 'active minus'"
              ><i class="fas fa-home me-2"></i>Dashboard</router-link
            >
          </li>
          <li>
            <router-link :to="{name: 'profile'}" :active-class="isPlus ? 'active plus' : 'active minus'"
              ><i class="fas fa-user me-2"></i>Profile</router-link
            >
          </li>
          <li>
            <router-link :to="{name: 'categories'}" :active-class="isPlus ? 'active plus' : 'active minus'"
              ><i class="fas fa-th-large me-2"></i>Categories</router-link
            >
          </li>
          <li>
            <router-link :to="{name: 'statistics'}" :active-class="isPlus ? 'active plus' : 'active minus'"
              ><i class="fas fa-chart-line me-2"></i>Statistics</router-link
            >
          </li>
          <li>
            <a href="#" role="button" @click="logout"
              ><i class="fas fa-sign-out-alt me-2"></i>Sign out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  props: {
    sidebarType: {
      type: String,
      required: true,
    },
    isPlus: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
aside {
  height: 100vh;
  min-height: 580px;
  width: 100%;
  top: 0;
  left: 0;
}
aside.mobile-sidebar {
  width: 300px;
  z-index: 1001;
  position: fixed;
  -webkit-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  transform: translateX(-100%);
  background-color: var(--bg-color);
  -webkit-transition: 1s -webkit-transform cubic-bezier(0.23, 1, 0.32, 1);
  transition: 1s -webkit-transform cubic-bezier(0.23, 1, 0.32, 1);
  -o-transition: 1s transform cubic-bezier(0.23, 1, 0.32, 1);
  transition: 1s transform cubic-bezier(0.23, 1, 0.32, 1);
  transition: 1s transform cubic-bezier(0.23, 1, 0.32, 1),
    1s -webkit-transform cubic-bezier(0.23, 1, 0.32, 1);
}
.show-sidebar aside.mobile-sidebar {
  -webkit-transform: translateX(0%);
  -ms-transform: translateX(0%);
  transform: translateX(0%);
}
aside.mobile-sidebar .toggle {
  padding-left: 30px;
  padding-top: 30px;
  position: absolute;
  right: 60px;
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
}
.show-sidebar aside .toggle .burger:before,
.show-sidebar aside .toggle .burger span,
.show-sidebar aside .toggle .burger:after {
  background: #fff;
}
.show-sidebar aside {
  -webkit-box-shadow: 10px 0 30px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 10px 0 30px 0 rgba(0, 0, 0, 0.1);
}
aside .side-inner {
  padding: 30px 0;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
aside .side-inner .profile {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #efefef;
}
aside .side-inner .profile img {
  width: 80px;
  margin: 0 auto 20px auto;
  border-radius: 50%;
}
aside .side-inner .profile .name {
  font-size: 18px;
}
aside .side-inner .profile .email {
  word-wrap: break-word;
}
aside .side-inner .nav-menu ul,
aside .side-inner .nav-menu ul li {
  padding: 0;
  margin: 0px;
  list-style: none;
}
aside .side-inner .nav-menu ul li a {
  display: block;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #8b8b8b;
  position: relative;
  -webkit-transition: 0.3s padding-left ease;
  -o-transition: 0.3s padding-left ease;
  transition: 0.3s padding-left ease;
}
aside .side-inner .nav-menu ul li a:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0px;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: 0.3s opacity ease, 0.3s visibility ease, 0.3s width ease;
  -o-transition: 0.3s opacity ease, 0.3s visibility ease, 0.3s width ease;
  transition: 0.3s opacity ease, 0.3s visibility ease, 0.3s width ease;
}
aside .side-inner .nav-menu ul li a:active,
aside .side-inner .nav-menu ul li a:focus,
aside .side-inner .nav-menu ul li a:hover {
  outline: none;
}
aside .side-inner .nav-menu ul li a:hover {
  background: #fcfcfc;
  color: #000;
}
aside .side-inner .nav-menu ul li a:hover:before {
  width: 4px;
  opacity: 1;
  visibility: visible;
}
aside .side-inner .nav-menu ul li a.active {
  background: #fcfcfc;
  color: #000;
}
aside .side-inner .nav-menu ul li a.active.plus:before{
  background-color: var(--plus-color);
}
aside .side-inner .nav-menu ul li a.active.minus:before{
  background-color: var(--minus-color);
}
aside .side-inner .nav-menu ul li a.active:before {
  opacity: 1;
  visibility: visible;
  width: 4px;
}
</style>