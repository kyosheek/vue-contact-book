<template>
  <AddContactDialog v-if="adding"
    @add="addContact"
    @cancel="addCancel" />
  <DeleteContactDialog v-if="deleting"
    @delete="deleteContact"
    @cancel="deleteCancel" />
  <div v-if="!isEmpty" class="book-content">
    <template v-for="(obj) in contacts" :key="obj.id">
      <ContactCard
        :data="obj"
        @delete="this.toDelete = obj.id; this.deleting = true;" />
    </template>
  </div>
  <template v-else>
    <h1>No contacts yet!</h1>
  </template>
  <div class="book-right-aside">
    <button
      @click="this.adding = true">New contact</button>
  </div>
</template>

<script>
import ContactCard from '@/components/book/ContactCard.vue';
import AddContactDialog from '@/components/book/AddContactDialog.vue';
import DeleteContactDialog from '@/components/book/DeleteContactDialog.vue';

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
      isEmpty: true,
    };
  },
  methods: {
    addContact(obj) {
      const key = new Date().valueOf();
      localStorage.setItem(key, JSON.stringify(obj));
      const o = {
        id: key,
        ...obj,
      };
      this.contacts.push(o);
      this.adding = false;
    },
    addCancel() {
      this.adding = false;
    },
    deleteContact() {
      this.contacts = this.contacts.filter((obj) => obj.id !== this.toDelete);
      localStorage.removeItem(this.toDelete);
      this.deleting = false;
      this.toDelete = null;
    },
    deleteCancel() {
      this.deleting = false;
      this.toDelete = null;
    },
  },
  created() {
    const l = localStorage.length;
    const arr = [];
    for (let i = 0; i < l; i += 1) {
      const key = localStorage.key(i);
      if (key !== 'loglevel:webpack-dev-server') {
        const o = {
          id: key,
          ...JSON.parse(localStorage.getItem(key)),
        };
        arr.push(o);
      }
    }
    arr.sort((a, b) => {
      if (a.firstName > b.firstName) return 1;
      if (b.firstName > a.firstName) return -1;
      return 0;
    });
    this.contacts = arr;
    if (l > 1) this.isEmpty = false;
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
