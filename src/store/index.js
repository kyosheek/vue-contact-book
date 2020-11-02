import { createStore } from 'vuex';

export default createStore({
  state: {
    contacts: {},
    changes: [],
  },
  getters: {
    contacts: (state) => state.contacts,
    contactById: (state) => (id) => state.contacts[id],
    anyChanges: (state) => state.changes.length > 0,
  },
  mutations: {
    setContactField: (state, payload) => {
      const { id, name, value } = payload;
      const copy = {};
      Object.assign(copy, state.contacts[id]);
      if (!payload.isHistory) {
        const keys = Object.keys(copy);
        if (!keys.includes(name)) {
          state.changes.push({
            action: 'removeContactField',
            payload: {
              id, name,
            },
          });
        }
      }
      copy[name] = value;
      state.contacts[id] = copy;
    },
    removeContactField: (state, payload) => {
      const { id, name } = payload;
      const obj = {};
      Object.assign(obj, state.contacts[id]);
      const value = obj[name];
      delete obj[name];
      state.contacts[id] = obj;
      if (!payload.isHistory) {
        state.changes.push({
          action: 'setContactField',
          payload: {
            id, name, value,
          },
        });
      }
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
    addChange: (state, payload) => {
      if (!payload.isHistory) {
        state.changes.push({
          action: 'setContactField',
          payload,
        });
      }
    },
    initLastChange: (state) => state.changes.pop(),
    clearChanges: (state) => {
      state.changes = [];
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
      const { id, name, value } = payload;
      const obj = {};
      Object.assign(obj, context.state.contacts[id]);
      obj[name] = value;
      localStorage.setItem(id, JSON.stringify(obj));
      context.commit('setContactField', payload);
    },
    removeField: async (context, payload) => {
      const { id, name } = payload;
      const obj = {};
      Object.assign(obj, context.state.contacts[id]);
      delete obj[name];
      localStorage.setItem(id, JSON.stringify(obj));
      context.commit('removeContactField', payload);
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
    addChange: async (context, payload) => {
      context.commit('addChange', payload);
    },
    clearChanges: async (context) => {
      context.commit('clearChanges');
    },
    callChange: async (context) => {
      const change = context.state.changes.pop();
      context.commit(change.action, {
        isHistory: true,
        ...change.payload,
      });
    },
  },
  modules: {
  },
});
