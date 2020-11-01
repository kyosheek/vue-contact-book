<template>
  <CancelEditDialog v-if="cancelEdit"
    @revert="revertChanges"
    @continue="continueChanges" />
  <RemoveFieldDialog v-if="removing"
    @remove="removeField"
    @cancel="cancelRemove" />
  <div class="contact-info-content">
    <template v-for="(val, key) in info" :key="key">
      <div class="contact-info-content__row">
        <label>{{ `${printFieldName(key)}: ` }}</label>
        <input
          :disabled="toEdit !== key"
          :value="val"
          :name="key"
          @input="editFields($event.target)" />
        <div v-if="toEdit !== key">
          <button
            class="mdc-icon-buttons material-icons md-24 icon-blue"
            @click="initEdit(key, val)">
            edit
          </button>
          <button
            class="mdc-icon-buttons material-icons md-24 icon-red"
            v-if="!reservedFields.includes(key)"
            @click="initRemove(key)">
            delete
          </button>
        </div>
        <div v-else>
          <button
            class="mdc-icon-buttons material-icons md-24 icon-green"
            :disabled="!canSave"
            @click="stopEdit">
            save
          </button>
          <button
            class="mdc-icon-buttons material-icons md-24 icon-red"
            @click="initCancelEdit">
            cancel
          </button>
        </div>
      </div>
    </template>
    <div class="contact-info-content__row new-field-row">
      <input v-model="newKey" />
      <input v-model="newValue" />
      <div class="contact-info-content__row__button-wrap">
        <button
          class="mdc-icon-buttons material-icons md-24 icon-green"
          @click="addNewField">
          add
        </button>
      </div>
    </div>
  </div>
  <div class="contact-info-right-aside">
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
      toEdit: null,
      beforeEdit: {
        name: '',
        value: '',
      },
      canSave: false,
      cancelEdit: false,
      newKey: 'New Field',
      newValue: '',
    };
  },
  watch: {
    info: {
      handler(val) {
        const { name, value } = this.beforeEdit;
        if (name.length > 0) {
          this.canSave = val[name] !== value;
        }
      },
      deep: true,
    },
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
      localStorage.setItem(this.id, JSON.stringify(this.info));
    },
    initEdit(key, val) {
      this.editing = true;
      this.beforeEdit.name = key;
      this.beforeEdit.value = val;
      this.toEdit = key;
    },
    editFields(e) {
      const { name, value } = e;
      this.info[name] = value;
      localStorage.setItem(this.id, JSON.stringify(this.info));
    },
    stopEdit() {
      this.canSave = false;
      this.beforeEdit.name = '';
      this.beforeEdit.value = '';
      this.toEdit = null;
    },
    initCancelEdit() {
      if (this.canSave) {
        this.cancelEdit = true;
      } else {
        this.editing = false;
        this.cancelEdit = false;
        this.stopEdit();
      }
    },
    revertChanges() {
      this.editing = false;
      this.toEdit = null;
      const { name, value } = this.beforeEdit;
      this.info[name] = value;
      localStorage.setItem(this.id, JSON.stringify(this.info));
      this.beforeEdit.name = '';
      this.beforeEdit.value = '';
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
      localStorage.setItem(this.id, JSON.stringify(this.info));
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

<style scoped>
button {
  margin-top: 0px;
}

.contact-info-content {
  margin-top: 20px;
  flex: 0 1 60vw;
  display: flex;
  flex-direction: column;
}

.contact-info-content__row {
  margin-left: 20px;
  margin-bottom: 10px;
  display: flex;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  align-items: center;
}

.contact-info-content__row > label {
  flex: 1;
  text-align: left;
}

.contact-info-content__row > input {
  flex: 2;
  padding: 6px;
  font-size:
}

.contact-info-content__row > div {
  flex: 1;
  text-align: left;
  margin-left: 10px;
}

.contact-info-content__row > div > button {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

.contact-info-content__row > div > button:first-of-type {
  margin-right: 10px;
}

.new-field-row > input {
  flex: 4;
}

.new-field-row > div {
  flex: 1;
}

input {
  font-size: 16px;
  outline: none;
}

input:disabled {
  background-color: white;
  border: none;
}

input:enabled {
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.contact-info-right-aside {
  flex: 0 1 20vw;
  display: flex;
  flex-direction: column;
}
</style>
