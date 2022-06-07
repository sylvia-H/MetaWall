<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- 貼文排序 & 搜尋列 -->
  <div class="flex mb-4">
    <!-- 貼文排序 -->
    <select
      v-model="timeSort"
      @change="getPosts()"
      class="border-2 border-secondary focus:border-indigo-300 py-3 px-4 mr-3"
    >
      <option value="desc">最新貼文</option>
      <option value="asc">從舊到最新</option>
    </select>
    <!-- 搜尋列 -->
    <div class="flex">
      <div class="w-80 lg:w-96">
        <div
          class="input-group relative flex items-stretch w-full border-2 border-secondary"
        >
          <input
            v-model="searchKeyword"
            type="search"
            class="form-control relative flex-auto min-w-0 block w-full py-3 px-4 text-base font-bold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="搜尋貼文"
            aria-label="Search"
            aria-describedby="button-search"
          />
          <button
            class="btn px-4 py-3 bg-primary text-white border-l-2 border-secondary hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button"
            id="button-search"
            @click="getPosts()"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              class="w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 貼文動態 -->
  <WallPosts v-if="posts" :posts="posts" :user="user" />
  <NoPost v-else />
</template>

<script>
import VueLoader from '@/components/LoadingOverlay.vue';
import NoPost from '@/components/NoPost.vue';
import WallPosts from '@/components/WallPosts.vue';

export default {
  components: {
    VueLoader,
    NoPost,
    WallPosts,
  },
  data() {
    return {
      isLoading: false,
      posts: [],
      timeSort: 'desc',
      searchKeyword: '',
    };
  },
  props: ['user'],
  inject: ['emitter'],
  watch: {
    searchKeyword: function() {
      this.getPosts();
    },
  },
  methods: {
    getPosts() {
      this.isLoading = true;
      let url = `https://cryptic-chamber-79078.herokuapp.com/posts?timeSort=${this.timeSort}&q=${this.searchKeyword}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getPosts();
    this.emitter.on('get-posts', () => {
      this.getPosts();
    });
  },
};
</script>
