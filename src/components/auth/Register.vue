<template>
  <section class="register-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="auth-form-card">
            <h1 class="text-center my-3">Welcome to Budget</h1>
            <form class="mt-5" @submit.prevent="onSubmit">
              <div class="mb-3 position-relative">
                <i class="fas fa-user position-absolute input-field-symbol">
                </i>
                <label for="username">Your Name</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  name="username"
                  placeholder="username"
                />
                <small>Name is required!</small>
              </div>
              <div class="mb-3 position-relative">
                <i
                  class="fas fa-envelope position-absolute input-field-symbol"
                ></i>
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                />
                <small>Email is required!</small>
              </div>
              <div class="mb-3 position-relative">
                <i
                  class="
                    toggle-password
                    fas
                    fa-eye-slash
                    position-absolute
                    input-field-symbol
                  "
                  style="cursor: pointer"
                >
                </i>
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="password"
                />

                <small>Minium - 8</small>
              </div>
              <div class="mb-3 position-relative">
                <i
                  class="
                    toggle-password
                    fas
                    fa-eye-slash
                    position-absolute
                    input-field-symbol
                  "
                  style="cursor: pointer"
                >
                </i>
                <label for="password">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="password"
                />

                <small>Password are not match!</small>
              </div>
              <button
                type="submit"
                id="budget-submit"
                class="btn btn-primary rounded"
              >
                Register
              </button>
            </form>
            <p class="text-center mt-4">
              Already have an account? Sign in
              <router-link
                to="/signin"
                class="text-primary text-decoration-underline"
                >here.
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  setup() {},
  methods: {
    onSubmit() {
      console.log("register");
    },
  },
};
</script>