<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <Navbar class="fixed" />
  <main class="min-h-screen bg-grid py-28">
    <div class="container_wall mx-auto flex justify-between">
      <!-- 左側動態牆 -->
      <div>
        <RouterView :user="user" />
      </div>
      <!-- 右側選單 -->
      <div class="w-80 h-88 bg-white border-2 border-secondary py-8 px-6">
        <RouterLink to="/main/post">
          <button
            class="w-full py-4 rounded-lg bg-primary border-2 border-secondary hover:bg-blue-700 text-white font-bold text-base mb-6"
          >
            張貼動態
          </button>
        </RouterLink>
        <ul class="font-noto-sans-tc font-bold text-base">
          <li class="flex items-center mb-6">
            <div
              class="h-12 w-12 border-2 border-secondary rounded-full overflow-hidden mr-4"
            >
              <img
                class="object-cover w-full h-full"
                src="../assets/Sylvia-H.jpg"
                alt="user's avatar"
              />
            </div>
            <p class="group-hover:cursor-pointer">Sylvia-H</p>
          </li>

          <RouterLink to="/main/follow">
            <li class="group flex items-center mb-6">
              <button
                type="button"
                class="flex items-center justify-center h-12 w-12 border-2 border-secondary rounded-full bg-info group-hover:drop-shadow-md group-hover:bg-blue-200 mr-4"
              >
                <!-- <i class="bi bi-bell text-xl font-extrabold"></i> -->
                <span class="iconify text-xl font-extrabold" data-icon="bi:bell"></span>
              </button>
              <p
                class="group-hover:cursor-pointer group-hover:border-b-2 border-secondary"
              >
                追蹤名單
              </p>
            </li>
          </RouterLink>
          <RouterLink to="/main/likes">
            <li class="group flex items-center">
              <button
                type="button"
                class="flex items-center justify-center h-12 w-12 border-2 border-secondary rounded-full bg-info group-hover:drop-shadow-md group-hover:bg-blue-200 mr-4"
              >
                <!-- <i class="bi bi-hand-thumbs-up text-xl font-extrabold"></i> -->
                <span class="iconify text-xl font-extrabold" data-icon="bi:hand-thumbs-up"></span>
              </button>
              <p
                class="group-hover:cursor-pointer group-hover:border-b-2 border-secondary"
              >
                我按讚的文章
              </p>
            </li>
          </RouterLink>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from '@/components/NavBar.vue';
import VueLoader from '@/components/LoadingOverlay.vue';
export default {
  components: {
    Navbar,
    VueLoader
  },
  data() {
    return {
      isLoading: false,
      user:{},
    };
  },
  methods: {
    getUser(id) {
      this.isLoading = true;
      let url = `https://cryptic-chamber-79078.herokuapp.com/users/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.user = res.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getUser('6298bb7386d7d2a709c289de');
  },
};
</script>
