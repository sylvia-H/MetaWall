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
  <VForm
    class="w-full"
    @submit="signIn"
    :validation-schema="VFormSchema"
    v-slot="{ errors }"
  >
    <VField
      class="mt-4 px-6 py-3 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Email"
      type="email"
      name="email"
      v-model="tempUser.email"
    />
    <ErrorMessage class="text-red-600 text-sm text-bold" name="email" />
    <VField
      class="mt-4 px-6 py-3 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Password"
      type="password"
      name="password"
      v-model="tempUser.password"
    />
    <ErrorMessage class="text-red-600 text-sm text-bold" name="password" />
    <p v-if="signInErr" class="mt-2 text-red-600 text-sm text-bold">
      帳號密碼輸入錯誤，或該帳號不存在，請重新輸入！
    </p>
    <button
      type="submit"
      class="w-full my-4 py-4 rounded-lg bg-primary hover:bg-blue-700 text-white font-bold text-base"
    >
      登入
    </button>
  </VForm>
  <RouterLink to="/signup">
    <button class="text-secondary font-bold text-base">註冊帳號</button>
  </RouterLink>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay.vue';
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/userStore';

export default {
  components: {
    VueLoader,
  },
  data() {
    return {
      isLoading: false,
      tempUser: {},
      VFormSchema: {
        email: 'required|email',
        password: 'required|alpha_num_mix',
      },
      signInErr: false,
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['updateUser']),
    signIn() {
      this.isLoading = true;
      this.$http
        .post(`${import.meta.env.VITE_BASE_API}/users/sign_in`, this.tempUser)
        .then((res) => {
          this.isLoading = false;
          this.signInErr = false;
          // 本機儲存 token 等 payload 資訊
          // const { token, _id, name, role, avatar } = res.data.user;
          // localStorage.setItem('accessToken', token);
          // localStorage.setItem('userID', _id);
          // localStorage.setItem('userName', name);
          // localStorage.setItem('userAvatar', avatar);
          // localStorage.setItem('userRole', role);
          const AUTH_TOKEN = res.data.user.token;
          document.cookie = `AUTH_TOKEN=${AUTH_TOKEN}`;
          this.updateUser(res.data.user);
          this.$router.push('/main');
        })
        .catch((err) => {
          this.isLoading = false;
          this.signInErr = true;
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
      this.$router.push('/main');
    }
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   this.$router.push('/main');
    // }
  },
};
</script>
