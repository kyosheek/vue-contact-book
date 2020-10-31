<template>
  <div class="remove-field-dialog">
    <div class="remove-field-dialog__content">
      <p>{{ `Are you sure you want to remove this field?` }}</p>
      <button @click="removeField">Yes</button>
      <button @click="cancelRemove">No</button>
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
.remove-field-dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
}

.remove-field-dialog__content {
  flex: 0 1 50vw;
  border: 2px solid #ff0046;
  border-radius: 5px;
  background-color: #cccccc;
}
</style>
