<template>
  <section class="register-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="login-form-card">
            <h1 class="text-center my-3">Welcome to Budget</h1>
            <form action="" method="POST" class="mt-5">
              <div class="form-floating mb-3 position-relative">
                <i class="fas fa-user position-absolute input-field-symbol">
                </i>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  name="username"
                  placeholder="username"
                />
                <label for="username">Your Name</label>
                <small>Name is required!</small>
              </div>
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
                <small>Minium - 8</small>
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

                <label for="password">Confirm Password</label>
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
              <a
                href="signin.html"
                class="text-primary text-decoration-underline"
                >here.</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>