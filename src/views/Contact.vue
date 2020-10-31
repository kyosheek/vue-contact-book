<template>
  <CancelEditDialog v-if="cancelEdit"
    @revert="revertChanges"
    @continue="continueChanges" />
  <RemoveFieldDialog v-if="removing"
    @remove="removeField"
    @cancel="cancelRemove" />
  <div class="contact-info-content">
    <template v-for="(val, key) in info" :key="key">
      <input
        disabled
        :value="printFieldName(key)" />
      <input
        :disabled="!editing"
        :value="val"
        :name="key"
        @input="editFields($event.target)" />
      <button
        v-if="!reservedFields.includes(key)"
        @click="initRemove(key)">Delete</button>
      <br />
    </template>
    <input v-model="newKey" />
    <input v-model="newValue" />
    <button @click="addNewField">Add field</button><br />
  </div>
  <div class="contact-info-right-aside">
    <button
      @click="initEdit">Edit</button>
    <button
      @click="this.cancelEdit = true;">Cancel Edit</button>
    <button>Save Edit</button>
  </div>
</template>

<script>
import CancelEditDialog from '@/components/contact/CancelEditDialog.vue';
import RemoveFieldDialog from '@/components/contact/RemoveFieldDialog.vue';

export default {
  name: 'Contact',
  components: {
    CancelEditDialog,
    RemoveFieldDialog,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      id: null,
      info: null,
      reservedFields: ['id', 'firstName', 'lastName', 'position', 'company', 'New Field'],
      removing: false,
      toRemove: null,
      editing: false,
      toEdit: {},
      cancelEdit: false,
      newKey: 'New Field',
      newValue: '',
    };
  },
  methods: {
    printFieldName(name) {
      if (name === 'firstName') return 'First Name';
      if (name === 'lastName') return 'Last Name';
      if (name === 'position') return 'Position';
      if (name === 'company') return 'Company';
      return name;
    },
    addNewField() {
      const key = this.newKey;
      const val = this.newValue;
      if (this.reservedFields.includes(key)) return;
      if (Object.prototype.hasOwnProperty.call(this.info, key)) return;
      if (val.length === 0) return;
      this.info[key] = val;
    },
    initEdit() {
      this.editing = true;
      console.log(this.editing);
    },
    editFields(e) {
      const { name, value } = e;
      this.toEdit[name] = value;
    },
    revertChanges() {
      this.editing = false;
      this.toEdit = {};
      this.cancelEdit = false;
    },
    continueChanges() {
      this.cancelEdit = false;
    },
    initRemove(key) {
      this.toRemove = key;
      this.removing = true;
    },
    removeField() {
      if (!this.reservedFields.includes(this.toRemove)) {
        delete this.info[this.toRemove];
      }
      this.removing = false;
      this.toRemove = null;
    },
    cancelRemove() {
      this.removing = false;
      this.toRemove = null;
    },
  },
  beforeCreate() {
    if (Object.keys(this.data).length === 0) this.$router.push('/book');
  },
  created() {
    this.id = this.data.id;
    delete this.data.id;
    this.info = this.data;
  },
};
</script>

<style>
.contact-info-content {
  flex: 0 1 60vw;
}

.contact-info-right-aside {
  flex: 0 1 20vw;
  display: flex;
  flex-direction: column;
}
</style>
