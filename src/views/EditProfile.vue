<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- 修改個人資料 -->
  <div class="themeBanner mb-8">
    <div
      class="h-20 flex items-center justify-center bg-white border-2 border-secondary"
    >
      <p class="font-azeret-mono text-xl font-bold text-center">修改個人資料</p>
    </div>
  </div>
  <div class="relative mt-18">
    <!-- 頁籤 -->
    <ul class="absolute flex" style="top: -42px; left: 16px">
      <li v-if="status === 'editNickname'">
        <button
          @click="status = 'editNickname'"
          class="rounded-t-lg py-2 px-6 bg-black text-white border-2 border-secondary"
        >
          暱稱修改
        </button>
      </li>
      <li v-else>
        <button
          @click="status = 'editNickname'"
          class="rounded-t-lg py-2 px-6 bg-white text-black border-2 border-secondary"
        >
          暱稱修改
        </button>
      </li>
      <li v-if="status === 'editPassword'">
        <button
          @click="status = 'editPassword'"
          class="rounded-t-lg py-2 px-6 bg-black text-white border-2 border-secondary"
        >
          重設密碼
        </button>
      </li>
      <li v-else>
        <button
          @click="status = 'editPassword'"
          class="rounded-t-lg py-2 px-6 bg-white text-black border-2 border-secondary"
        >
          重設密碼
        </button>
      </li>
    </ul>
    <!-- 編輯框 -->
    <div class="w-132 p-8 rounded-lg border-2 border-secondary bg-white">
      <!-- 修改暱稱編輯框 -->
      <div
        v-if="status === 'editNickname'"
        class="flex flex-col items-center justify-center"
      >
        <div
          class="h-28 w-28 border-2 border-secondary rounded-full overflow-hidden mb-4"
        >
          <img
            class="object-cover w-full h-full"
            :src="profile.avatar"
            :alt="`${profile.name}'s avatar`"
          />
        </div>
        <label
          for="file"
          class="relative mb-4 flex items-center justify-center text-white bg-black w-30 h-10"
        >
          <input
            @change="uploadAvatar"
            type="file"
            class="absolute top-0 left-0 cursor-pointer opacity-0 w-full h-full"
          />
          <button type="button" class="whitespace-nowrap py-1 px-6">
            上傳大頭照
          </button>
        </label>
        <div class="w-80">
          <div class="mb-4">
            <label for="nickname">
              <span class="block text-base font-medium text-slate-700"
                >暱稱</span
              >
              <input
                type="text"
                name="nickname"
                id="nickname"
                v-model="profile.name"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </label>
          </div>
          <div>
            <p>性別</p>
            <label for="Male" class="mr-8">
              <input
                type="radio"
                id="Male"
                name="sex"
                v-model="profile.sex"
                value="Male"
                class="mr-3"
              />
              男性
            </label>
            <label for="Female">
              <input
                type="radio"
                id="Female"
                name="sex"
                v-model="profile.sex"
                value="Female"
                class="mr-3"
              />
              女性
            </label>
          </div>
          <!-- 修改個人檔案送出按鈕 -->
          <div class="mt-8 w-full flex justify-center">
            <button
              type="button"
              @click="editProfile()"
              class="py-4 border-2 border-secondary bg-gray-2 hover:bg-warning rounded-lg w-80"
            >
              <p class="font-azeret-mono font-bold text-base text-center">
                更新個人檔案
              </p>
            </button>
          </div>
        </div>
      </div>
      <!-- 重設密碼編輯框 -->
      <div v-else class="flex flex-col items-center justify-center">
        <div class="w-80">
          <div class="mb-4">
            <span class="block text-base font-medium text-slate-700"
              >輸入新密碼</span
            >
            <label v-if="hiddenPassword" class="relative block" for="password">
              <input
                type="password"
                name="password"
                id="password"
                v-model="password.password"
                placeholder="請輸入新密碼"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              <button
                @click="changeBtnVisibility(1)"
                class="absolute inset-y-0 right-1 top-1 flex items-center"
              >
                <span
                  class="iconify text-gray-500 text-2xl"
                  data-icon="bx:show"
                ></span>
              </button>
            </label>
            <label v-else class="relative block" for="password2">
              <input
                type="text"
                name="password2"
                id="password2"
                v-model="password.password"
                placeholder="請輸入新密碼"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              <button
                @click="changeBtnVisibility(1)"
                class="absolute inset-y-0 right-1 top-1 flex items-center"
              >
                <span
                  class="iconify text-gray-500 text-2xl"
                  data-icon="dashicons:hidden"
                ></span>
              </button>
            </label>
          </div>
          <div class="mb-4">
            <span class="block text-base font-medium text-slate-700"
              >再次輸入</span
            >
            <label
              v-if="hiddenConfirmPassword"
              class="relative block"
              for="confirmPassword"
            >
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="再次輸入新密碼"
                v-model="password.confirmPassword"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              <button
                @click="changeBtnVisibility(2)"
                class="absolute inset-y-0 right-1 top-1 flex items-center"
              >
                <span
                  class="iconify text-gray-500 text-2xl"
                  data-icon="bx:show"
                ></span>
              </button>
            </label>
            <label v-else class="relative block" for="confirmPassword2">
              <input
                type="text"
                name="confirmPassword2"
                id="confirmPassword2"
                placeholder="再次輸入新密碼"
                v-model="password.confirmPassword"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              <button
                @click="changeBtnVisibility(2)"
                class="absolute inset-y-0 right-1 top-1 flex items-center"
              >
                <span
                  class="iconify text-gray-500 text-2xl"
                  data-icon="dashicons:hidden"
                ></span>
              </button>
            </label>
          </div>
        </div>
        <!-- 修改個人檔案送出按鈕 -->
        <div class="mt-8 w-full flex justify-center">
          <button
            type="button"
            @click="updatePassword()"
            class="py-4 border-2 border-secondary bg-gray-2 hover:bg-warning rounded-lg w-80"
          >
            <p class="font-azeret-mono font-bold text-base text-center">
              修改密碼
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
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
      profile: {
        avatar: 'https://i.imgur.com/K3dyy79.png',
      },
      password: {
        password: '',
        confirmPassword: '',
      },
      postsLists: [],
      status: 'editNickname',
      hiddenPassword: true,
      hiddenConfirmPassword: true,
    };
  },
  methods: {
    getProfile() {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/users/profile`;
      const token = document.cookie.split(`AUTH_TOKEN=`).pop().split(';').shift();
      this.axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.isLoading = false;
          this.profile = res.data.data;
          this.$emit('get-profile');
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    editProfile() {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/users/profile`;
      const token = document.cookie.split(`AUTH_TOKEN=`).pop().split(';').shift();
      this.axios({
        method: 'PATCH',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: this.profile,
      })
        .then((res) => {
          this.isLoading = false;
          // this.getProfile();
          this.$emit('get-profile');
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    uploadAvatar(e) {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/upload`;
      const token = document.cookie.split(`AUTH_TOKEN=`).pop().split(';').shift();
      let data = new FormData();
      const file = e.target.files[0];
      data.append('file', file);
      this.axios({
        method: 'POST',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      })
        .then((res) => {
          this.isLoading = false;
          this.profile.avatar = res.data.imgUrl;
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    changeBtnVisibility(num) {
      if (num == 1) {
        this.hiddenPassword
          ? (this.hiddenPassword = false)
          : (this.hiddenPassword = true);
      } else {
        this.hiddenConfirmPassword
          ? (this.hiddenConfirmPassword = false)
          : (this.hiddenConfirmPassword = true);
      }
    },
    updatePassword() {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/users/updatePassword`;
      const token = document.cookie.split(`AUTH_TOKEN=`).pop().split(';').shift();
      this.axios({
        method: 'POST',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: this.password,
      })
        .then((res) => {
          this.isLoading = false;
          const AUTH_TOKEN = res.data.user.token;
          document.cookie = `AUTH_TOKEN=${AUTH_TOKEN}`;
          // 本機儲存 token 等 payload 資訊
          // const { token, _id, name, role, avatar } = res.data.user;
          // localStorage.setItem('accessToken', token);
          // localStorage.setItem('userID', _id);
          // localStorage.setItem('userName', name);
          // localStorage.setItem('userAvatar', avatar);
          // localStorage.setItem('userRole', role);
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>
