import { defineStore } from 'pinia';

export default defineStore('userStore', {
  state: () => ({
    user: {
      avatar: 'https://i.imgur.com/K3dyy79.png',
    },
  }),
  actions: {
    updateUser(obj) {
      this.user = obj;
    },
  },
});
