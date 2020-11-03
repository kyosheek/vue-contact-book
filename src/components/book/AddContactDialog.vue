<template>
  <div class="dialog">
    <div class="dialog__content">
      <div class="add-contact-dialog__content__fields">
        <div class="add-contact-dialog__content__fields__field">
          <label>First name *: </label><input v-model="firstName" />
        </div>
        <div class="add-contact-dialog__content__fields__field">
          <label>Last name: </label><input v-model="lastName" />
        </div>
        <div class="add-contact-dialog__content__fields__field">
          <label>Position name: </label><input v-model="position" />
        </div>
        <div class="add-contact-dialog__content__fields__field">
          <label>Company name: </label><input v-model="company" />
        </div>
      </div>
      <button
        class="dialog__content__button button-add material-icons md-18 icon-green"
        :disabled="firstName.length === 0"
        @click="addContact">
        add
      </button>
      <button
        class="dialog__content__button button-clear material-icons md-18 icon-red"
        @click="addCancel">
        clear
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddContactDialog',
  emits: ['add', 'cancel'],
  data() {
    return {
      firstName: '',
      lastName: '',
      position: '',
      company: '',
    };
  },
  methods: {
    addContact() {
      if (this.firstName.length === 0) return;
      const obj = {
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        company: this.company,
      };
      this.$emit('add', obj);
    },
    addCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style>
.add-contact-dialog__content__fields {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.add-contact-dialog__content__fields__field {
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
}

label {
  flex: 1;
  text-align: left;
  margin-right: 10px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

input {
  flex: 2;
  margin-right: 10px;
}

.button-add {
  margin-right: 10px;
}

.button-clear {
  margin-left: 10px;
}
</style>
