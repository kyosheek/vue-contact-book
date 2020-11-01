<template>
  <transition name="dialog-fade">
    <AddContactDialog v-if="adding"
      @add="addContact"
      @cancel="addCancel" />
  </transition>
  <transition name="dialog-fade">
    <DeleteContactDialog v-if="deleting"
      @delete="deleteContact"
      @cancel="deleteCancel" />
  </transition>
  <div v-if="!isEmpty" class="book-content">
    <template v-for="(obj) in contacts" :key="obj.id">
      <ContactCard
        :data="obj"
        @delete="deleteInit(obj.id)" />
    </template>
  </div>
  <template v-else>
    <h1>No contacts yet!</h1>
  </template>
  <div class="book-right-aside">
    <button
      class="button-person-add mdc-icon-buttons material-icons md-36 icon-green"
      @click="this.adding = true">
      person_add
    </button>
  </div>
</template>

<script>
import ContactCard from '@/components/book/ContactCard.vue';
import AddContactDialog from '@/components/book/AddContactDialog.vue';
import DeleteContactDialog from '@/components/book/DeleteContactDialog.vue';

const sortContacts = (a, b) => {
  if (a.firstName > b.firstName) return 1;
  if (b.firstName > a.firstName) return -1;
  return 0;
};

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
      const copy = [...this.contacts];
      copy.push(o);
      copy.sort((a, b) => sortContacts(a, b));
      this.contacts = copy;
      this.adding = false;
    },
    addCancel() {
      this.adding = false;
    },
    deleteInit(id) {
      this.toDelete = id;
      this.deleting = true;
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
    arr.sort((a, b) => sortContacts(a, b));
    this.contacts = arr;
    if (arr.length > 0) this.isEmpty = false;
  },
};
</script>

<style>
.book-content {
  flex: 1 1 60vw;
}

.book-right-aside {
  flex: 1 1 20vw;
  display: flex;
}

.button-person-add {
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

.dialog-fade-enter-active {
  transition: all 0.5s ease;
}
.dialog-fade-leave-active {
  transition: all 0.5s ease;
}
.dialog-fade-enter, .dialog-fade-leave-to {
  opacity: 0;
}
.dialog-fade-enter-to, .dialog-fade-leave {
  opacity: 1;
}
</style>
