<template>
  <div class="remove-field-dialog">
    <div class="remove-field-dialog__content">
      <p>{{ `Are you sure you want to remove this field?` }}</p>
      <button
        class="button-check mdc-icon-buttons material-icons md-18 icon-green"
        @click="removeField">
        check
      </button>
      <button
        class="button-clear mdc-icon-buttons material-icons md-18 icon-red"
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
.remove-field-dialog {
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
}

.remove-field-dialog__content {
  padding-top: 10px;
  flex: 0 1 50vw;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding-bottom: 15px;
}

p {
  margin-bottom: 15px;
  margin-left: 6px;
  margin-right: 6px;
}

.button-check {
  margin-right: 10px;
}

.button-clear {
  margin-left: 10px;
}

button {
  padding: 3px 5px 3px 5px;

  background-color: rgba(255, 255, 255, 1);
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

  cursor: pointer;
}
</style>
