import { createStore } from 'vuex';

export default createStore({
  state: {
    contacts: {},
  },
  getters: {
    contacts: (state) => state.contacts,
    contactById: (state) => (id) => state.contacts.find((contact) => contact.id === id),
  },
  mutations: {
    setContactField: (state, payload) => {
      const { id, name, value } = payload;
      state.contacts[id][name] = value;
    },
    addContact: (state, payload) => {
      const copy = { ...payload };
      const { id } = copy;
      delete copy.id;
      state.contacts[id] = copy;
    },
    removeContact: (state, payload) => {
      delete state.contacts[payload];
    },
  },
  actions: {
    uploadContacts: async (context) => {
      const l = localStorage.length;
      for (let i = 0; i < l; i += 1) {
        const key = localStorage.key(i);
        if (key !== 'loglevel:webpack-dev-server') {
          const o = {
            id: key,
            ...JSON.parse(localStorage.getItem(key)),
          };
          context.commit('addContact', o);
        }
      }
    },
    changeContact: async (context, payload) => {
      context.commit('setContactField', payload);
    },
    saveContact: async (context, payload) => {
      const copy = { ...payload };
      const { id } = copy;
      delete copy.id;
      localStorage.setItem(id, JSON.stringify(copy));
      context.commit('addContact', payload);
    },
    deleteContact: async (context, payload) => {
      localStorage.removeItem(payload);
      context.commit('removeContact', payload);
    },
  },
  modules: {
  },
});
