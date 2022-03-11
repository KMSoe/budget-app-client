<template>
  <section class="py-3">
    <div class="row">
      <div class="col-sm-10 col-md-8 col-lg-12 mx-auto">
        <div class="pt-5 pb-3 ps-2 mobile-sticky-nav bg-main">
          <h4>Financial Amount Detail on Category</h4>
          <div class="swip-nav d-flex justify-content-flex-start mt-4 mb-md-3">
            <a
              class="
                income-category-pie-nav
                active
                btn
                select-btn
                text-white
                me-3
                py-1
                px-3
              "
            >
              <i class="fas fa-check me-2"></i>Income
            </a>
            <a
              class="
                expense-category-pie-nav
                btn
                select-btn
                text-white
                me-3
                py-1
                px-3
              "
            >
              <i class="fas fa-check me-2"></i>Expense
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.select-btn {
  border-radius: 15px;
}
.income-category-pie-nav,
.expense-category-pie-nav {
  background-color: #3f3f3f;
}
.income-category-pie-nav.active,
.income-nav.active {
  background-color: var(--plus-color);
}
.expense-category-pie-nav.active,
.expense-nav.active {
  background-color: var(--minus-color);
}
.income-category-pie-nav i,
.expense-category-pie-nav i {
  display: none;
  transition: display 0.3s ease-in;
}
.income-category-pie-nav.active i,
.expense-category-pie-nav.active i {
  display: inline;
}
</style>