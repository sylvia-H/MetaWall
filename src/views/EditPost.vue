<template>
  <!-- 貼文排序 & 搜尋列 -->
  <div class="themeBanner w-132 bg-white border-2 border-secondary p-5 mb-4">
    <p class="font-azeret-mono text-xl font-bold text-center">張貼動態</p>
  </div>
  <!-- 編輯貼文 -->
  <div
    class="dialogue w-full border-2 border-secondary bg-white rounded-lg mb-4"
  >
    <div class="p-8">
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
export default {
  data() {
    return {
      isLoading: false,
      post: {
        author: '6298bb7386d7d2a709c289de',
        content: '',
        image: '',
      },
    };
  },
  methods: {
    addPost() {
      this.isLoading = true;
      let url = 'https://cryptic-chamber-79078.herokuapp.com/posts';
      this.$http.post(url, this.post)
        .then((res) => {
          this.isLoading = false;
          console.log(this.post);
          console.dir(res);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(this.post);
          console.dir(err);
        });

      // 清空貼文內容
      this.post = {
        content: '',
        image: '',
      };
    },
  },
};
</script>
