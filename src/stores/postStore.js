import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from './statusStore';
const status = statusStore();

export default defineStore('postStore', {
  state: () => ({
    posts: [],
  }),
  actions: {
    getPosts(timeSort = 'desc', searchKeyword = '', id = '', getMine = false) {
      status.isLoading = true;
      const token = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
      let url;
      if (id) {
        if (getMine) {
          console.log('getMine');
          url = `${
            import.meta.env.VITE_BASE_API
          }/posts/${id}?timeSort=${timeSort}&q=${searchKeyword}`;
        } else {
          console.log('getOthers');
          url = `${
            import.meta.env.VITE_BASE_API
          }/posts/space/${id}?timeSort=${timeSort}&q=${searchKeyword}`;
        }
      } else {
        console.log('getPosts');
        url = `${
          import.meta.env.VITE_BASE_API
        }/posts?timeSort=${timeSort}&q=${searchKeyword}`;
      }
      axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          status.isLoading = false;
          this.posts = res.data.data;
        })
        .catch((err) => {
          status.isLoading = false;
          console.dir(err);
        });
    },
  },
});
