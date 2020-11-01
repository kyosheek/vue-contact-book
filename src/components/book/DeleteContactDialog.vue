<template>
  <div class="delete-contact-dialog">
    <div class="delete-contact-dialog__content">
      <p>Are you sure you want to delete this contact entry?</p>
      <button class="button-check" @click="deleteContact">
        <i class="icon-check material-icons md-18 icon-green">check</i></button>
      <button class="button-clear" @click="deleteCancel">
        <i class="icon-clear material-icons md-18 icon-red">clear</i></button>
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

<style scoped>
.delete-contact-dialog {
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

.delete-contact-dialog__content {
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
