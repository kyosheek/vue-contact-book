import { createStore } from 'vuex';

export default createStore({
  state: {
    contacts: {},
    history: [],
  },
  getters: {
    getContacts: (state) => state.contacts,
    getContactById: (state) => (id) => state.contacts[id],
    isAnyChanges: (state) => state.history.length > 0,
  },
  mutations: {
    SET_CONTACT_FIELD: (state, payload) => {
      const { id, name, value } = payload;
      const copy = {};
      Object.assign(copy, state.contacts[id]);
      if (!payload.isHistory) {
        const keys = Object.keys(copy);
        if (!keys.includes(name)) {
          state.history.push({
            action: 'REMOVE_CONTACT_FIELD',
            payload: {
              id, name,
            },
          });
        }
      }
      copy[name] = value;
      state.contacts[id] = copy;
    },
    REMOVE_CONTACT_FIELD: (state, payload) => {
      const { id, name } = payload;
      const obj = {};
      Object.assign(obj, state.contacts[id]);
      const value = obj[name];
      delete obj[name];
      state.contacts[id] = obj;
      if (!payload.isHistory) {
        state.history.push({
          action: 'SET_CONTACT_FIELD',
          payload: {
            id, name, value,
          },
        });
      }
    },
    ADD_CONTACT: (state, payload) => {
      const copy = { ...payload };
      const { id } = copy;
      delete copy.id;
      state.contacts[id] = copy;
    },
    REMOVE_CONTACT: (state, payload) => {
      delete state.contacts[payload];
    },
    ADD_ACTION_TO_HISTORY: (state, payload) => {
      if (!payload.isHistory) {
        state.history.push({
          action: 'SET_CONTACT_FIELD',
          payload,
        });
      }
    },
    REMOVE_ALL_HISTORY: (state) => {
      state.history = [];
    },
  },
  actions: {
    fetchContacts: async (context) => {
      const l = localStorage.length;
      for (let i = 0; i < l; i += 1) {
        const key = localStorage.key(i);
        if (key !== 'loglevel:webpack-dev-server') {
          const o = {
            id: key,
            ...JSON.parse(localStorage.getItem(key)),
          };
          context.commit('ADD_CONTACT', o);
        }
      }
    },
    updateContact: async (context, payload) => {
      const { id, name, value } = payload;
      const obj = {};
      Object.assign(obj, context.state.contacts[id]);
      obj[name] = value;
      localStorage.setItem(id, JSON.stringify(obj));
      context.commit('SET_CONTACT_FIELD', payload);
    },
    removeContactField: async (context, payload) => {
      const { id, name } = payload;
      const obj = {};
      Object.assign(obj, context.state.contacts[id]);
      delete obj[name];
      localStorage.setItem(id, JSON.stringify(obj));
      context.commit('REMOVE_CONTACT_FIELD', payload);
    },
    addContact: async (context, payload) => {
      const copy = { ...payload };
      const { id } = copy;
      delete copy.id;
      localStorage.setItem(id, JSON.stringify(copy));
      context.commit('ADD_CONTACT', payload);
    },
    deleteContact: async (context, payload) => {
      localStorage.removeItem(payload);
      context.commit('REMOVE_CONTACT', payload);
    },
    updateHistory: async (context, payload) => {
      context.commit('ADD_ACTION_TO_HISTORY', payload);
    },
    clearHistory: async (context) => {
      context.commit('REMOVE_ALL_HISTORY');
    },
    dispatchFromHistory: async (context) => {
      const change = context.state.history.pop();
      context.commit(change.action, {
        isHistory: true,
        ...change.payload,
      });
    },
  },
});
