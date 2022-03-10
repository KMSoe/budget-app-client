<template>
  <section class="total-balance-section py-3 px-4">
    <div class="row justify-content-center justify-content-lg-start">
      <div
        class="col-sm-10 col-md-8 col-lg-10 col-xl-8 mb-3"
        style="background-color: unset"
      >
        <a
          href="#"
          role="button"
          class="btn bg-primary text-white py-1 px-3 my-2"
          id="pick-month-btn"
          style="border-radius: 12px"
        >
          <i class="fas fa-calendar-alt me-2"></i>
          <span id="year-month">
            {{ brief.year }}&nbsp;&dash;&nbsp;{{ brief.month }}
          </span>
        </a>
        <Datepicker
          v-model="month"
          monthPicker
          class="d-inline-block ms-3"
          style="width: 150px"
          @update:modelValue="changeMonth"
        />

        <div class="card-body">
          <h3 class="h5">Total Balance</h3>
          <div class="row">
            <div class="col-10">
              <span class="total-balance font-weight-bold">
                {{ brief.net_budget }}
              </span>

              <p class="minus font-weight-bold mt-2">You have No Income.</p>

              <p class="minus font-weight-bold mt-2">
                Your Expense is greater than your Income.
              </p>

              <p class="minus font-weight-bold mt-2">You have No Expense.</p>

              <p class="minus font-weight-bold mt-2">
                You have spent 20% of your Income in February.
              </p>
            </div>
            <div class="col-2 add-button">
              <a
                href=""
                data-bs-toggle="modal"
                data-bs-target="#choose"
                class="d-block w-100 h-100 position-relative"
              >
                <i class="fas fa-plus"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Total Income, Expense Section Start -->
  <section class="total-value-section px-1 px-lg-3">
    <div
      class="
        row
        d-flex
        justify-content-center justify-content-lg-start
        align-items-stretched
      "
    >
      <div class="col-6 col-sm-4 col-lg-5 col-xl-4">
        <div
          class="card mx-auto w-100 h-100 mb-3"
          style="background-color: unset"
        >
          <div class="bg-plus card-body position-relative text-white">
            <h3 class="card-title h4">Total Income</h3>
            <span class="total-income-value font-weight-bold">
              {{ brief.income }}
            </span>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-4 col-lg-5 col-xl-4">
        <div
          class="card mx-auto w-100 h-100 mb-3"
          style="background-color: unset"
        >
          <div class="bg-minus card-body position-relative text-white">
            <h3 class="card-title h4">Total Expense</h3>
            <span class="total-expense-value font-weight-bold">
              {{ brief.expense }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Total Income, Expense Section End -->
  <budget-add-modal />
  <!-- Select Month modal -->
  <div class="modal" id="select-month">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="ps-3 py-3">
          <h5 class="modal-title text-center">Select a month</h5>
        </div>
        <div class="modal-body">
          <form action="/home" method="GET" id="select-month-form">
            <input
              type="text"
              name="time"
              id="monthpicker"
              placeholder="Select a month"
              class="form-control"
              autocomplete="off"
              onkeyup="disableButtonSelectMonth(this)"
            />
          </form>
        </div>
        <div class="text-center pt-2 pb-3">
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            class="ms-3 btn btn-primary"
            form="select-month-form"
            id="btnsubmit"
            type="submit"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BudgetAddModal from "../partials/BudgetAddModal.vue";
import { ref } from "vue";

export default {
  components: {
    "budget-add-modal": BudgetAddModal,
  },
  setup() {
    const d = new Date();
    const month = ref({ month: d.getMonth(), year: d.getFullYear() });
    return {
      month,
    };
  },
  props: {
    brief: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeMonth() {
      this.$store.dispatch("fetchMonthlyBrief", {
        month: this.month.month + 1,
        year: this.month.year,
      });
    },
  },
};
</script>
<style scoped>
.add-button {
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background-color: #1da1f2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.add-button i {
  color: white;
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (min-width: 768px) {
  .add-button {
    width: 50px;
    height: 50px;
  }
  .add-button i {
    font-size: 28px;
  }
}
</style>