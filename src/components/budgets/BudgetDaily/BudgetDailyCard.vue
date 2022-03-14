<template>
  <div class="card daily-stat-card rounded mb-3">
    <div class="card-header d-flex px-2">
      <span class="flex-fill me-2"> {{ card.day }} </span>
      <span class="me-2">Income: {{ card.income }} </span>
      <span class="me-2">Expense: {{ card.expense }} </span>
    </div>
    <div class="card-body p-0">
      <ul class="mb-0 px-0">
        <li
          class="d-flex align-items-center py-2 px-3"
          v-for="item in card.items"
          :key="item.id"
        >
          <i
            :class="`cat-icon me-3 my-auto ${item.class}`"
            :style="{ backgroundColor: item.color }"
          ></i>
          <span class="flex-fill my-auto"
            >{{ item.name }} <br />
            <span class="text-muted">{{ item.remark }}</span></span
          >
          <span
            :class="[
              item.amount > 0
                ? 'plus font-weight-bold my-auto'
                : 'minus font-weight-bold my-auto',
            ]"
          >
            {{ item.amount }}
          </span>

          <div
            class="ms-2 text-center"
            style="width: 42px; height: 42px; line-height: 42px"
          >
            <i
              class="fas fa-times-circle d-inline-block mx-auto"
              @click="deleteBudget(item.id)"
            ></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="card-footer">
      <p class="mb-0" style="letter-spacing: 1px">
        {{ card.percentage }}% of your monthly Income was spent.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteBudget(id) {
      this.$store.dispatch("deleteBudget", id);
    },
  },
};
</script>
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