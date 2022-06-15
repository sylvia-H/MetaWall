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
    <div
      class="w-132 flex flex-col items-center justify-center p-8 rounded-lg border-2 border-secondary bg-white"
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
        <input @change="uploadAvatar" type="file" class="absolute top-0 left-0 cursor-pointer opacity-0 w-full h-full" />
        <button type="button" class="whitespace-nowrap py-1 px-6">
          上傳大頭照
        </button>
      </label>
      <div class="w-80">
        <div class="mb-4">
          <label for="nickname">
            <span class="block text-base font-medium text-slate-700">暱稱</span>
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
        avatar:'https://i.imgur.com/K3dyy79.png',
      },
      postsLists: [],
      status: 'editNickname',
    };
  },
  methods: {
    getProfile(id) {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/users/profile/${id}`;
      const token = localStorage.getItem('accessToken');
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
          console.log(res.data.data);
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    editProfile() {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/users/profile`;
      const token = localStorage.getItem('accessToken');
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
          this.getProfile();
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    uploadAvatar(e) {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/upload`;
      const token = localStorage.getItem('accessToken');
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
  },
  mounted() {
    const _id = localStorage.getItem('userID');
    this.getProfile(_id);
  },
};
</script>
