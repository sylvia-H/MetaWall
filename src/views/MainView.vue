<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <Navbar class="fixed" />
  <main class="min-h-screen bg-grid py-28">
    <div class="container_wall mx-auto flex justify-between">
      <!-- 左側動態牆 -->
      <div>
        <RouterView v-if="isUpdateUser" @get-profile="getProfile" />
      </div>
      <!-- 右側選單 -->
      <div class="w-80 h-88 bg-white border-2 border-secondary py-8 px-6">
        <RouterLink to="/main/post">
          <button
            class="w-full py-4 rounded-lg bg-primary border-2 border-secondary hover:bg-blue-700 text-white font-bold text-base mb-6"
          >
            張貼動態
          </button>
        </RouterLink>
        <ul class="font-noto-sans-tc font-bold text-base">
          <li class="flex items-center mb-6">
            <div
              class="h-12 w-12 border-2 border-secondary rounded-full overflow-hidden mr-4"
            >
              <img
                class="object-cover w-full h-full"
                :src="user.avatar"
                alt="user's avatar"
              />
            </div>
            <p class="group-hover:cursor-pointer">
              {{ user.name }}
            </p>
          </li>

          <RouterLink to="/main/follow">
            <li class="group flex items-center mb-6">
              <button
                type="button"
                class="flex items-center justify-center h-12 w-12 border-2 border-secondary rounded-full bg-info group-hover:drop-shadow-md group-hover:bg-blue-200 mr-4"
              >
                <!-- <i class="bi bi-bell text-xl font-extrabold"></i> -->
                <span
                  class="iconify text-xl font-extrabold"
                  data-icon="bi:bell"
                ></span>
              </button>
              <p
                class="group-hover:cursor-pointer group-hover:border-b-2 border-secondary"
              >
                追蹤名單
              </p>
            </li>
          </RouterLink>
          <RouterLink to="/main/likes">
            <li class="group flex items-center">
              <button
                type="button"
                class="flex items-center justify-center h-12 w-12 border-2 border-secondary rounded-full bg-info group-hover:drop-shadow-md group-hover:bg-blue-200 mr-4"
              >
                <!-- <i class="bi bi-hand-thumbs-up text-xl font-extrabold"></i> -->
                <span
                  class="iconify text-xl font-extrabold"
                  data-icon="bi:hand-thumbs-up"
                ></span>
              </button>
              <p
                class="group-hover:cursor-pointer group-hover:border-b-2 border-secondary"
              >
                我按讚的文章
              </p>
            </li>
          </RouterLink>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from '@/components/NavBar.vue';
import VueLoader from '@/components/LoadingOverlay.vue';
import { mapState, mapActions } from 'pinia';
import { userStore, statusStore } from '@/stores';

export default {
  data() {
    return {
      isUpdateUser: false,
    };
  },
  components: {
    Navbar,
    VueLoader,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(statusStore, ['isLoading']),
  },
  methods: {
    ...mapActions(userStore, ['updateUser']),
    getProfile() {
      this.isLoading = true;
      const token = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
      let url = `${import.meta.env.VITE_BASE_API}/users/profile`;
      this.axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.isLoading = false;
          this.updateUser(res.data.data);
          this.isUpdateUser = true;
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
  },
  mounted() {
    let AUTH_TOKEN;
    if (document.cookie.split(`AUTH_TOKEN=`).length === 2) {
      AUTH_TOKEN = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
    }
    if (AUTH_TOKEN) {
      this.getProfile();
    } else {
      this.$router.push({ name: 'login' });
    }
  },
};
</script>
