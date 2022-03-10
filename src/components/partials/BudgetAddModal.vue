<template>
  <div class="modal" id="choose">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="py-3 ps-3">
          <h5 class="modal-title text-center">
            Choose
          </h5>
        </div>
        <div class="modal-body">
          <a
            href="/"
            class="hover me-3"
          >
            <i class="income fas fa-dollar-sign mb-1 plus"></i>
            <p>Income</p>
          </a>
          <a
            href="/"
            class="hover ms-3"
          >
            <i class="expense fas fa-file-invoice-dollar mb-1 minus"></i>
            <p>Expense</p>
          </a>
        </div>
        <div class="pt-2 pb-3 text-center">
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.modal.show .modal-dialog {
    top: 35%;
    transform: translateY(-50%);
}
.modal.show .modal-dialog .modal-content {
    background-color: var(--bg-color);
    box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
}
.modal.show .modal-dialog .modal-title {
    color: var(--text-color);
    font-weight: bold;
    font-size: 22px;
}
.modal.show#share .modal-dialog .modal-body,
.modal.show#choose .modal-dialog .modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.modal.show#share .modal-dialog .modal-body a,
.modal.show#choose .modal-dialog .modal-body a {
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
.modal.show#share .modal-dialog .modal-body a {
    flex: 1;
}
.modal.show#choose .modal-dialog .modal-body a {
    flex-basis: 40%;
}
/* .modal.show#choose .modal-dialog .modal-body a i.income,
.income-title-icon {
    color: var(--plusColor);
}
.modal.show#choose .modal-dialog .modal-body a i.expense,
.expense-title-icon {
    color: var(--minusColor);
} */
.modal.show#share .modal-dialog .modal-body a i,
.modal.show#choose .modal-dialog .modal-body a i {
    font-size: 48px;
    margin-bottom: 5px;
}
.modal.show .modal-dialog .modal-body a p {
    color: var(--text-color);
}
</style>