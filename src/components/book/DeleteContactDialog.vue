<template>
  <div class="delete-contact-dialog">
    <div class="delete-contact-dialog__content">
      <p>Are you sure you want to delete this contact entry?</p>
      <button @click="deleteContact">Yes</button>
      <button @click="deleteCancel">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteContactDialog',
  emits: ['delete', 'cancel'],
  methods: {
    deleteContact() {
      this.$emit('delete');
    },
    deleteCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style>
.delete-contact-dialog {
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

.delete-contact-dialog__content {
  flex: 0 1 50vw;
  border: 2px solid #ff0046;
  border-radius: 5px;
  background-color: #cccccc;
}
</style>
