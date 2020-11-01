<template>
  <div class="add-contact-dialog">
    <div clas="add-contact-dialog__content">
      <label>First name: <input v-model="firstName" /></label><br />
      <label>Last name: <input v-model="lastName" /></label><br />
      <label>Position name: <input v-model="position" /></label><br />
      <label>Company name: <input v-model="company" /></label><br />
      <button @click="addContact">Add</button>
      <button @click="addCancel">Cancel</button>
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

.add-contact-dialog__content {
  flex: 0 1 50vw;
  border: 2px solid #ff0046;
  border-radius: 5px;
  background-color: #cccccc;
}
</style>
