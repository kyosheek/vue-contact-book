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
            class="material-icons md-24 icon-blue"
            @click="initEdit(key, val)">
            edit
          </button>
          <button
            class="material-icons md-24 icon-red"
            v-if="!reservedFields.includes(key)"
            @click="initRemove(key)">
            delete
          </button>
        </div>
        <div v-else>
          <button
            class="material-icons md-24 icon-green"
            :disabled="!canSave"
            @click="stopEdit">
            save
          </button>
          <button
            class="material-icons md-24 icon-red"
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
          class="material-icons md-24 icon-green"
          @click="addNewField">
          add
        </button>
      </div>
    </div>
  </div>
  <aside class="contact-info-right-aside">
    <button
      :disabled="!anyChanges"
      class="button-history material-icons md-36 icon-blue"
      @click="revertChange">
      history
    </button>
  </aside>
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
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
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
  computed: {
    info() {
      return this.$store.getters.getContactById(this.id);
    },
    anyChanges() {
      return this.$store.getters.isAnyChanges;
    },
  },
  watch: {
    info: {
      handler(val) {
        const { name, value } = this.beforeEdit;
        if (name === 'firstName' && val[name].length === 0) {
          this.canSave = false;
        } else if (name.length > 0) {
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
      const o = {
        id: this.id,
        name: this.newKey,
        value: this.newValue,
      };
      if (this.reservedFields.includes(o.name)) return;
      if (Object.prototype.hasOwnProperty.call(this.info, o.name)) return;
      if (o.value.length === 0) return;
      this.$store.dispatch('updateContact', o);
    },
    initEdit(key, val) {
      this.editing = true;
      this.beforeEdit.name = key;
      this.beforeEdit.value = val;
      this.toEdit = key;
    },
    editFields(e) {
      const o = {
        id: this.id,
        name: e.name,
        value: e.value,
      };
      this.$store.dispatch('updateContact', o);
    },
    stopEdit() {
      this.canSave = false;
      this.$store.dispatch('updateHistory', {
        id: this.id,
        name: this.beforeEdit.name,
        value: this.beforeEdit.value,
      });
      this.beforeEdit.name = '';
      this.beforeEdit.value = '';
      this.toEdit = null;
    },
    initCancelEdit() {
      if (this.canSave) {
        this.cancelEdit = true;
      } else {
        this.revertChanges();
        this.canSave = false;
      }
    },
    revertChanges() {
      this.editing = false;
      this.toEdit = null;
      const o = {
        id: this.id,
        name: this.beforeEdit.name,
        value: this.beforeEdit.value,
      };
      this.$store.dispatch('updateContact', o);
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
      const o = {
        id: this.id,
        name: this.toRemove,
      };
      if (!this.reservedFields.includes(this.toRemove)) {
        this.$store.dispatch('removeContactField', o);
      }
      this.removing = false;
      this.toRemove = null;
    },
    cancelRemove() {
      this.removing = false;
      this.toRemove = null;
    },
    revertChange() {
      this.$store.dispatch('dispatchFromHistory');
    },
  },
  beforeCreate() {
    if (!this.id) this.$router.push('/book');
  },
  created() {
  },
};
</script>

<style>
.contact-info-content {
  margin-top: 20px;
  flex: 1 1 60vw;
  display: flex;
  flex-direction: column;
}

.contact-info-content__row {
  margin-left: 20px;
  margin-right: 20px;
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
  flex: 1.5;
}

.new-field-row > div {
  flex: 1;
}

.contact-info-right-aside {
  display: flex;
  flex: 1 1 20vw;
}

.button-history {
  width: 80px;
  height: 80px;
  margin-top: 20px;

  position: fixed;

  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}
</style>
