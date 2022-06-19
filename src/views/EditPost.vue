<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- 張貼動態 -->
  <div class="themeBanner mb-4">
    <div
      class="h-20 flex items-center justify-center bg-white border-2 border-secondary"
    >
      <p class="font-azeret-mono text-xl font-bold text-center">張貼動態</p>
    </div>
  </div>
  <!-- 編輯貼文 -->
  <div
    class="dialogue w-full border-2 border-secondary bg-white rounded-lg mb-4"
  >
    <div class="p-8">
      <!-- 貼文隱私狀態 -->
      <p class="font-noto-sans-tc text-base mb-2">貼文隱私狀態</p>
      <select
        v-model="post.privacy"
        class="border-2 border-secondary focus:border-indigo-300 text-sm py-2 px-4 mb-4"
      >
        <option value="private">只限本人</option>
        <option value="public">公開</option>
      </select>
      <p class="font-noto-sans-tc text-base mb-2">貼文內容</p>
      <!-- 貼文內容 -->
      <textarea
        class="mb-4 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary py-3 px-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        placeholder="輸入您的貼文內容"
        name="post"
        rows="7"
        v-model="post.content"
      />
      <!-- 貼文附圖圖片位址 -->
      <p class="font-noto-sans-tc text-base mb-2">貼文附圖</p>
      <label for="uploadImg" class="relative block mb-5">
        <input
          type="text"
          name="uploadImg"
          class="p-2 placeholder:italic placeholder:text-slate-400 placeholder:text-sm w-full block bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          aria-label="請輸入圖片網址或上傳圖檔"
          placeholder="請輸入圖片連結位址"
          v-model="post.image"
        />
      </label>
      <label
        for="file"
        class="relative mb-4 flex items-center justify-center text-white bg-black w-30 h-10"
      >
        <input
          @change="uploadImg"
          type="file"
          class="absolute top-0 left-0 cursor-pointer opacity-0 w-full h-full"
        />
        <button type="button" class="whitespace-nowrap py-1 px-6">
          上傳圖片檔
        </button>
      </label>
      <!-- 測試用網址：https://reurl.cc/d2pNrg -->
      <!-- <label for="uploadFile" class="relative block mb-5">
        <input
          type="file"
          name="uploadFile"
          class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-noto-sans-tc file:bg-secondary file:text-white"
        />
      </label> -->
      <!-- 貼圖 -->
      <div
        v-if="post.image"
        class="w-full h-40 border-2 border-secondary rounded-lg overflow-hidden"
      >
        <img
          class="object-cover w-full h-full"
          :src="post.image"
          alt="post image"
        />
      </div>
      <p class="text-red-1 text-base font-bold">{{ errorMsg }}</p>
      <!-- 送出貼文按鈕 -->
      <div class="mt-8 w-full flex justify-center">
        <button
          type="button"
          @click="addPost()"
          class="py-4 border-2 border-secondary bg-gray-2 hover:bg-warning rounded-lg w-80"
        >
          <p class="font-azeret-mono font-bold text-base text-center">
            送出貼文
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay.vue';
import { statusStore } from '@/stores';

export default {
  components: {
    VueLoader,
  },
  data() {
    return {
      post: {
        content: '',
        image: '',
        privacy: 'private',
      },
      errorMsg: '',
    };
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
  },
  methods: {
    addPost() {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/posts`;
      const token = document.cookie.split(`AUTH_TOKEN=`).pop().split(';').shift();
      this.axios({
        method: 'POST',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: this.post,
      })
        .then((res) => {
          this.isLoading = false;
          this.$router.push('/main');
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });

      // 清空貼文內容
      this.post = {
        content: '',
        image: '',
      };
    },
    uploadImg(e) {
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
          this.errorMsg = '';
          this.post.image = res.data.imgUrl;
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorMsg = err.response.data.message;
        });
    },
  },
};
</script>
