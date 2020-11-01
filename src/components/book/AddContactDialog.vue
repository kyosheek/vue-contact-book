<template>
  <div class="add-contact-dialog">
    <div class="add-contact-dialog__content">
      <div class="add-contact-dialog__content__fields">
        <div class="add-contact-dialog__content__fields__field">
          <label>First name: </label><input v-model="firstName" />
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
        class="button-add mdc-icon-buttons material-icons md-18 icon-green"
        @click="addContact">
        add
      </button>
      <button
        class="button-clear mdc-icon-buttons material-icons md-18 icon-red"
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
.add-contact-dialog {
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

.add-contact-dialog__content {
  padding-top: 10px;
  flex: 0 1 50vw;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding-bottom: 15px;
}

.add-contact-dialog__content__fields {
  display: flex;
  flex-direction: column;
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

button {
  margin-top: 5px;
  padding: 3px 5px 3px 5px;

  background-color: rgba(255, 255, 255, 1);
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

  cursor: pointer;
}
</style>
