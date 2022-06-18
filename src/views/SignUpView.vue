<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <h2 class="text-xl md:text-2xl font-bold sm:mb-4">註冊新帳號</h2>
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
    @submit="signUp"
    :validation-schema="VFormSchema"
    v-slot="{ errors }"
  >
    <VField
      class="mt-4 px-6 py-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="暱稱"
      type="text"
      name="nickname"
      v-model="user.name"
    />
    <ErrorMessage class="text-red-600 text-sm text-bold" name="nickname" />
    <VField
      class="mt-4 px-6 py-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Email"
      type="email"
      name="email"
      v-model="user.email"
    />
    <ErrorMessage class="text-red-600 text-sm text-bold" name="email" />
    <VField
      class="mt-4 px-6 py-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Password"
      type="password"
      name="password"
      v-model="user.password"
    />
    <ErrorMessage class="text-red-600 text-sm text-bold" name="password" />
    <button
      type="submit"
      class="w-full mt-4 py-2 rounded-lg bg-gray-2 border-2 border-gray-4 hover:bg-blue-700 text-white font-bold text-base"
    >
      註冊
    </button>
    <div class="flex justify-center mt-4">
      <!-- Google 第三方登入 -->
      <button type="button" @click="googlePassPort" class="flex font-bold items-center p-1 border-b-2 border-gray-1 hover:border-secondary">
        <span
          class="iconify text-xl font-extrabold mr-2"
          data-icon="akar-icons:google-contained-fill"
        ></span>
        使用 Google 帳號註冊登入
      </button>
    </div>
  </VForm>
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
      VFormSchema: {
        nickname: 'required|min:2',
        email: 'required|email',
        password: 'required|alpha_num_mix',
      },
    };
  },
  methods: {
    signUp() {
      this.isLoading = true;
      const user = this.user;
      this.$http
        .post(`${import.meta.env.VITE_BASE_API}/users/sign_up`, user)
        .then(() => {
          this.isLoading = false;
          this.user = {};
          this.$router.push('/');
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    googlePassPort() {
      this.isLoading = true;
      this.$http
        .get(`${import.meta.env.VITE_BASE_API}/auth/google`)
        .then((res) => {
          this.isLoading = false;
          this.user = {};
          // 本機儲存 token 等 payload 資訊
          const { token, _id, name, role, avatar } = res.data.user;
          localStorage.setItem('accessToken', token);
          localStorage.setItem('userID', _id);
          localStorage.setItem('userName', name);
          localStorage.setItem('userAvatar', avatar);
          localStorage.setItem('userRole', role);
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
