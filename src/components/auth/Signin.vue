<template>
  <section class="login-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="auth-form-card">
            <h3 class="text-center mt-5 mb-1">Welcome Back</h3>
            <form class="mt-5" @submit.prevent="onSubmit">
              <div class="form-floating mb-3 position-relative" :class="{ invalid_input: v$.email.$error }">
                <i
                  class="fas fa-envelope position-absolute input-field-symbol"
                ></i>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  v-model="v$.email.$model"
                />
                <label for="email">Email</label>
                <template v-if="v$.email.$dirty">
                  <small
                    class="form-text error"
                    v-if="v$.email.required.$invalid"
                    >email is required</small
                  >
                  <small class="form-text error" v-if="v$.email.email.$invalid"
                    >Invalid email</small
                  >
                </template>
              </div>
              <div class="form-floating mb-3 position-relative" :class="{ invalid_input: v$.password.$error }">
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
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  name="password"
                  placeholder="password"
                  v-model="v$.password.$model"
                />
                <label for="password">Password</label>
                <template v-if="v$.password.$dirty">
                  <small
                    class="form-text error"
                    v-if="v$.password.required.$invalid"
                    >password is required</small
                  >
                </template>
              </div>
              <button
                type="submit"
                id="budget-submit"
                class="btn btn-primary rounded"
                :disabled="v$.$invalid"
              >
                Sign in
              </button>
            </form>
            <p class="text-center mt-4">
              Don't have an account? Register
              <router-link
                to="/register"
                class="text-primary text-decoration-underline"
                >here.</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    onSubmit() {
      const authData = {
        email: this.email,
        password: this.password,
      };
      console.log(authData);
      // this.$store.dispatch("signin", authData);
    },
  },
};
</script>
<style>
.login-section,
.register-section {
  padding: 5vh 0;
}
.login-section p,
.register-section p {
  font-size: 20px;
  letter-spacing: 1px;
}
input[type="text"],
input[type="password"] {
  letter-spacing: 2px;
}
label {
  color: var(--text-color);
}
textarea {
  color: var(--text-color);
  background-color: var(--bg-color);
  border: 1px solid #1da1f2;
  padding: 3px 5px;
}
select.form-select {
  width: unset;
  background-color: var(--bg-color);
}
input.form-control {
  background-color: var(--bg-color) !important;
  color: var(--text-color) !important;
}
input.form-control::placeholder {
  color: var(--text-color);
}
.input-field-symbol {
  top: 28%;
  right: 15px;
  color: var(--text-color);
  font-size: 20px;
}
.invalid_input label, .invalid_input small{
  color: red;
} 
</style>