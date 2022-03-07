<template>
  <div class="card daily-stat-card rounded mb-3">
    <div class="card-header d-flex px-2">
      <span class="flex-fill me-2"> Feb 28 </span>
      <span class="me-2">Income: 50000 </span>
      <span class="me-2">Expense: 2500 </span>
    </div>
    <div class="card-body p-0">
      <ul class="mb-0 px-0">
        <li class="d-flex py-2 px-3">
          <i
            class="cat-icon fas fa-dollar-sign me-3 my-auto"
            style="background-color: green"
          ></i>
          <span class="flex-fill my-auto"
            >Bonus <br />
            <span class="text-muted"></span
          ></span>
          <span
            class="{{ $item->amount > 0 ? 'plus' : 'minus' }} font-weight-bold my-auto"
          >
            50000
          </span>

          <span class="my-auto ms-2" style="width: 40px; height: 40px">
            <i class="fas fa-times-circle"></i>
          </span>
        </li>
      </ul>
    </div>
    <div class="card-footer">
      <p class="mb-0" style="letter-spacing: 1px">
        20% of your monthly Income was spent.
      </p>
    </div>
  </div>
</template>
<style>
i.cat-icon {
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
}
i.cat-icon::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>