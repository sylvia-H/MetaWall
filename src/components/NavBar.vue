<template>
  <nav class="bg-white border-b-2 border-secondary w-full fixed">
    <ul class="container_wall mx-auto flex justify-between items-center py-3">
      <li>
        <RouterLink to="/">
          <h1 class="font-paytone-one text-2xl text-secondary mb-2">
            MetaWall
          </h1>
        </RouterLink>
      </li>
      <li class="relative group">
        <a class="flex items-center" href="#">
          <div
            class="h-8 w-8 border-2 border-secondary rounded-full overflow-hidden mr-2.5"
          >
            <img
              class="object-cover w-full h-full"
              :src="user.avatar"
              :alt="`${user.name}'s avatar`"
            />
          </div>
          <p
            class="font-azeret-mono font-bold text-base border-b-2 border-secondary"
          >
            {{ user.name }}
          </p>
          <!-- Hovers Dropdown Menu -->
          <div
            class="absolute hidden group-hover:block top-9 bg-white border-2 border-secondary shadow-lg"
          >
            <div class="nav_dropMenu relative bg-white">
              <ul class="font-noto-sans-tc text-base text-center w-48">
                <RouterLink :to="`/main/space/${user._id}`">
                  <li class="py-2 border-b-2 border-secondary hover:bg-gray-1">
                    我的貼文牆
                  </li>
                </RouterLink>
                <RouterLink to="/main/profile">
                  <li class="py-2 border-b-2 border-secondary hover:bg-gray-1">
                    修改個人資料
                  </li>
                </RouterLink>
                <li class="py-2 hover:bg-gray-1">登出</li>
              </ul>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
nav {
  z-index: 1000;
}
.nav_dropMenu {
  &::before {
    position: absolute;
    content: '';
    z-index: -1;
    background-color: white;
    border: 2px solid #000040;
    width: 192px;
    height: 125px;
    top: 5px;
    left: 6px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  inject: ['emitter'],
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
