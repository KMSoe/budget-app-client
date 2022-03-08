<template>
  <section class="register-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="auth-form-card">
            <h1 class="text-center my-3">Welcome to Budget</h1>
            <div class="alert alert-danger" v-for="(value, key) in errors" :key="key">{{ value[0] }}</div>
            <form
              class="mt-5"
              @submit.prevent="onSubmit"
              enctype="multipart/form-data"
            >
              <div
                class="form-floating mb-3 position-relative"
                :class="{ invalid_input: v$.name.$error }"
              >
                <i class="fas fa-user position-absolute input-field-symbol">
                </i>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Name"
                  v-model="v$.name.$model"
                />
                <label for="name">Your Name</label>
                <template v-if="v$.name.$dirty">
                  <small
                    class="form-text error"
                    v-if="v$.name.required.$invalid"
                    >Name is required</small
                  >
                </template>
              </div>
              <div
                class="form-floating mb-3 position-relative"
                :class="{ invalid_input: v$.email.$error }"
              >
                <i
                  class="fas fa-envelope position-absolute input-field-symbol"
                ></i>
                <input
                  type="email"
                  id="email"
                  v-model="v$.email.$model"
                  class="form-control"
                  placeholder="Email"
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
              <div
                class="form-floating mb-3 position-relative"
                :class="{ invalid_input: v$.password.$error }"
              >
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
                  <small
                    class="form-text error"
                    v-if="v$.password.minLength.$invalid"
                    >Password must be at least
                    {{ v$.password.minLength.$params.min }} characters</small
                  >
                </template>
              </div>
              <div
                class="form-floating mb-3 position-relative"
                :class="{ invalid_input: v$.confirmPassword.$error }"
              >
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
                  class="form-control"
                  name="password"
                  id="confirmPassword"
                  placeholder="password"
                  v-model="v$.confirmPassword.$model"
                />

                <label for="confirmPassword">Confirm Password</label>
                <template v-if="v$.confirmPassword.$dirty">
                  <small
                    class="form-text error"
                    v-if="v$.confirmPassword.sameAs.$invalid"
                    >Passwords don't match!!!</small
                  >
                </template>
              </div>
              <div class="mb-3 d-flex">
                <label for="" class="me-3">Gender: </label>
                <div class="form-check me-3">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="male"
                    name="gender"
                    value="male"
                    v-model="gender"
                  />
                  <label for="male">Male</label>
                </div>
                <div class="form-check me-3">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="female"
                    name="gender"
                    value="female"
                    v-model="gender"
                  />
                  <label for="female">Female</label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="others"
                    name="gender"
                    value="others"
                    v-model="gender"
                  />
                  <label for="others">Others</label>
                </div>
              </div>
              <div>
                <label for="image">Profile Image</label>
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="image"
                    name="image"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary rounded"
                :disabled="v$.$invalid"
              >
                signup
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
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      image: "",
    };
  },
  computed: {
    ...mapGetters(['errors'])
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: { sameAs: sameAs(this.password) },
    };
  },
  methods: {
    onSubmit() {
      const authData = {
        name: this.name,
        email: this.email,
        password: this.password,
        gender: this.gender,
        image: this.image,
      };
      this.$store.dispatch("signup", authData);
    },
  },
};
</script>