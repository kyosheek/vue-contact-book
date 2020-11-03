<template>
  <div class="dialog">
    <div class="dialog__content">
      <p>Are you sure you want to delete this contact entry?</p>
      <button
        class="dialog__content__button button-check material-icons md-18 icon-green"
        @click="deleteContact">
        check
      </button>
      <button
        class="dialog__content__button button-clear material-icons md-18 icon-red"
        @click="deleteCancel">
        clear
      </button>
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
.button-check {
  margin-right: 10px;
}

.button-clear {
  margin-left: 10px;
}
</style>
