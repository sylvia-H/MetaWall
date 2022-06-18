<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- 我按讚的貼文 -->
  <div class="themeBanner mb-4">
    <div
      class="h-20 flex items-center justify-center bg-white border-2 border-secondary"
    >
      <p class="font-azeret-mono text-xl font-bold text-center">我按讚的貼文</p>
    </div>
  </div>
  <div
    v-for="favList in favLists"
    :key="favList._id"
    class="hover:dialogue w-full border-2 border-secondary bg-white rounded-lg mb-4"
  >
    <!-- 按讚貼文列表 -->
    <div class="flex p-4">
      <div
        class="h-11 w-11 border-2 border-secondary rounded-full overflow-hidden mr-2.5"
      >
        <img
          class="object-cover w-full h-full"
          :src="favList.author.avatar"
          :alt="`${favList.author.name}'s avatar`"
        />
      </div>
      <div class="grow flex justify-between">
        <div>
          <p class="font-noto-sans-tc font-bold text-base mb-1">
            {{ favList.author.name }}
          </p>
          <p class="font-noto-sans-tc text-sm text-brown-1">
            發文時間：{{ $filters.transferToDate(favList.createdAt) }}
          </p>
        </div>
        <div class="flex items-center">
          <!-- 取消按讚 -->
          <div>
            <div class="flex items-center">
              <div class="text-center">
                <button @click="unLike(favList._id)" type="button">
                  <div class="group">
                    <div class="block group-hover:hidden group-focus:hidden">
                      <span
                        class="iconify text-xl font-extrabold text-primary"
                        data-icon="bi:hand-thumbs-up"
                      ></span>
                    </div>
                    <div class="hidden group-hover:block group-focus:block">
                      <span
                        class="iconify text-xl font-extrabold text-primary"
                        data-icon="bi:hand-thumbs-up-fill"
                      ></span>
                    </div>
                  </div>
                </button>
                <p class="text-sm font-bold font-noto-sans-tc">收回讚</p>
              </div>
              <!-- 查看貼文 -->
              <div class="ml-8 mr-4 text-center">
                <button type="button">
                  <div class="group">
                    <div class="block group-hover:hidden group-focus:hidden">
                      <span
                        class="iconify text-xl font-extrabold text-primary"
                        data-icon="eva:arrow-circle-right-outline"
                      ></span>
                    </div>
                    <div class="hidden group-hover:block group-focus:block">
                      <span
                        class="iconify text-xl font-extrabold text-primary"
                        data-icon="eva:arrow-circle-right-fill"
                      ></span>
                    </div>
                  </div>
                </button>
                <p class="text-sm font-bold font-noto-sans-tc">查看</p>
              </div>
            </div>
          </div>
          <!-- 查看貼文 -->
          <div></div>
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
      favLists: [],
    };
  },
  methods: {
    getFavList() {
      this.isLoading = true;
      const _id = localStorage.getItem('userID');
      let url = `${import.meta.env.VITE_BASE_API}/posts/user/${_id}`;
      const token = document.cookie.split(`; AUTH_TOKEN=`).pop().split(';').shift();
      this.axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.isLoading = false;
          this.favLists = res.data.data;
          console.log(res.data.data);
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    unLike(postID) {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/posts/${postID}/like`;
      const token = document.cookie.split(`; AUTH_TOKEN=`).pop().split(';').shift();
      this.axios({
        method: 'DELETE',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          this.isLoading = false;
          this.getFavList();
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getFavList();
  },
};
</script>
