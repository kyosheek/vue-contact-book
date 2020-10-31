<template>
  <div class="cancel-edit-dialog">
    <div class="cancel-edit-dialog__content">
      <p>Are you sure you want to revert changes?</p>
      <button @click="revertChanges">Yes</button>
      <button @click="continueChanges">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CancelEditDialog',
  emits: ['revert', 'continue'],
  methods: {
    revertChanges() {
      this.$emit('revert');
    },
    continueChanges() {
      this.$emit('continue');
    },
  },
};
</script>

<style>
.cancel-edit-dialog {
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

.cancel-edit-dialog__content {
  flex: 0 1 50vw;
  border: 2px solid #ff0046;
  border-radius: 5px;
  background-color: #cccccc;
}
</style>
