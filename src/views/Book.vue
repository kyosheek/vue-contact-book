<template>
  <AddContactDialog v-if="adding"
    @add="addContact"
    @cancel="addCancel" />
  <DeleteContactDialog v-if="deleting"
    @delete="deleteContact"
    @cancel="deleteCancel" />
  <div class="book-content">
    <template v-for="(obj, idx) in contacts" :key="idx">
      <ContactCard
        :data="obj" :index="idx"
        @delete="this.toDelete = idx; this.deleting = true;" />
    </template>
  </div>
  <div class="book-right-aside">
    <button
      @click="this.adding = true">New contact</button>
  </div>
</template>

<script>
import ContactCard from '@/components/book/ContactCard.vue';
import AddContactDialog from '@/components/book/AddContactDialog.vue';
import DeleteContactDialog from '@/components/book/DeleteContactDialog.vue';

import dummy from '@/data';

export default {
  name: 'Book',
  components: {
    ContactCard,
    AddContactDialog,
    DeleteContactDialog,
  },
  data() {
    return {
      contacts: null,
      adding: false,
      deleting: false,
      toDelete: null,
    };
  },
  methods: {
    addContact(obj) {
      const keys = Object.keys(this.contacts);
      const l = keys.length;
      let key = -1;
      for (let i = 0; i < l; i += 1) {
        if (i !== Number(keys[i])) {
          key = i;
          break;
        }
      }
      if (key === -1) key = l;
      this.contacts[key] = obj;
      this.adding = false;
    },
    addCancel() {
      this.adding = false;
    },
    deleteContact() {
      const tmp = { ...this.contacts };
      delete tmp[this.toDelete];
      this.contacts = { ...tmp };
      this.deleting = false;
      this.toDelete = null;
    },
    deleteCancel() {
      this.deleting = false;
      this.toDelete = null;
    },
  },
  created() {
    this.contacts = dummy;
  },
};
</script>

<style>
.book-content {
  flex: 1 1 60vw;
}

.book-right-aside {
  flex: 1 1 20vw;
}
</style>
