<template>
  <div class="dialog">
    <div class="dialog__content">
      <p>{{ `Are you sure you want to remove this field?` }}</p>
      <button
        class="dialog__content__button button-check material-icons md-18 icon-green"
        @click="removeField">
        check
      </button>
      <button
        class="dialog__content__button button-clear material-icons md-18 icon-red"
        @click="cancelRemove">
        clear
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemoveFieldDialog',
  emits: ['remove', 'cancel'],
  methods: {
    removeField() {
      this.$emit('remove');
    },
    cancelRemove() {
      this.$emit('cancel');
    },
  },
};
</script>

<style>
.button-check {
  margin-right: 10px;
}

.button-clear {
  margin-left: 10px;
}
</style>
