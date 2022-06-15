<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <!-- 追蹤名單 -->
  <div class="themeBanner mb-4">
    <div
      class="h-20 flex items-center justify-center bg-white border-2 border-secondary"
    >
      <p class="font-azeret-mono text-xl font-bold text-center">追蹤名單</p>
    </div>
  </div>
  <div
    v-for="following in followList"
    :key="following._id"
    class="hover:dialogue w-full border-2 border-secondary bg-white rounded-lg mb-4"
  >
    <!-- 追蹤對象資訊 -->
    <div class="flex p-4">
      <div
        class="h-11 w-11 border-2 border-secondary rounded-full overflow-hidden mr-2.5"
      >
        <img
          class="object-cover w-full h-full"
          :src="following.user.avatar"
          :alt="`${following.user.name}'s avatar`"
        />
      </div>
      <div class="grow">
        <p class="font-noto-sans-tc font-bold text-base mb-1">
          {{ following.user.name }}
        </p>
        <div class="flex justify-between">
          <p class="font-noto-sans-tc text-sm text-brown-1">
            追蹤時間：{{ $filters.transferToDate(following.createdAt) }}
          </p>
          <p class="font-noto-sans-tc text-sm text-secondary text-bold">
            您已追蹤 {{ $filters.transferSinceThen(following.createdAt) }} 天！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      followList: [],
    };
  },
  methods: {
    getFollowing() {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/users/follow`;
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
          this.followList = res.data.data.following;
          console.log(res.data.data.following);
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getFollowing();
  },
};
</script>
