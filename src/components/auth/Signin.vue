<template>
  <section class="login-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="login-form-card">
            <h1 class="text-center my-3">Budget</h1>
            <h3 class="text-center mt-5 mb-1">Welcome Back</h3>
            <form action="" method="POST" class="mt-5">
              <div class="form-floating mb-3 position-relative">
                <i
                  class="fas fa-envelope position-absolute input-field-symbol"
                ></i>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                />
                <label for="email">Email</label>
                <small>Email is required!</small>
              </div>
              <div class="form-floating mb-3 position-relative">
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
                />

                <label for="password">Password</label>
                <small>Password is required!</small>
              </div>
              <button
                type="submit"
                id="budget-submit"
                class="btn btn-primary rounded"
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
export default {
  setup() {},
};
</script>
<style>
.login-section,
.register-section {
  padding: 10vh 0;
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
input.form-control::placeholder,
form small {
  color: #ababab;
}
.input-field-symbol {
  top: 28%;
  right: 15px;
  color: var(--text-color);
  font-size: 20px;
}
</style>