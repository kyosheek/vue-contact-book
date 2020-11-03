<template>
  <div class="dialog">
    <div class="dialog__content">
      <p>Are you sure you want to revert changes?</p>
      <button
        class="dialog__content__button button-check material-icons md-18 icon-green"
        @click="revertChanges">
        check
      </button>
      <button
        class="dialog__content__button button-clear material-icons md-18 icon-red"
        @click="continueChanges">
        clear
      </button>
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
.button-check {
  margin-right: 10px;
}

.button-clear {
  margin-left: 10px;
}
</style>
