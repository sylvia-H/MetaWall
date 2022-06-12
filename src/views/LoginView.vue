<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <h2 class="text-xl md:text-2xl font-bold sm:mb-9">到元宇宙展開全新社交圈</h2>
  <div class="sm:hidden my-6">
    <img
      class="h-full w-full"
      style="max-width: 180px"
      src="../assets/login_img.svg"
      alt="MetaWall image"
    />
  </div>
  <label for="email" class="w-full mb-4">
    <span class="sr-only">Email</span>
    <input
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary px-6 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Email"
      type="email"
      name="email"
      v-model="user.email"
    />
  </label>
  <label for="password" class="w-full mb-6">
    <span class="sr-only">Password</span>
    <input
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary px-6 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Password"
      type="password"
      name="password"
      v-model="user.password"
    />
  </label>
  <button
    @click="signIn"
    class="w-full py-4 rounded-lg bg-primary hover:bg-blue-700 text-white font-bold text-base mb-4"
  >
    登入
  </button>
  <RouterLink to="/signup">
    <button class="text-secondary font-bold text-base">註冊帳號</button>
  </RouterLink>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay.vue';

export default {
  components: {
    VueLoader,
  },
  data() {
    return {
      isLoading: false,
      user: {},
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      const user = this.user;
      this.$http
        .post(`${import.meta.env.VITE_BASE_API}/users/sign_in`, user)
        .then((res) => {
          this.isLoading = false;
          // 本機儲存 token 等 payload 資訊
          const { token, _id, name, role, avatar } = res.data.user;
          localStorage.setItem('accessToken', token);
          localStorage.setItem('userID', _id);
          localStorage.setItem('userName', name);
          localStorage.setItem('userAvatar', avatar);
          localStorage.setItem('userRole', role);
          // this.axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
          this.$router.push('/main');
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
  },
};
</script>
