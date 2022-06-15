<template>
  <nav class="bg-white border-b-2 border-secondary w-full fixed">
    <ul class="container_wall mx-auto flex justify-between items-center py-3">
      <li>
        <RouterLink to="/main">
          <h1 class="font-paytone-one text-2xl text-secondary mb-2">
            MetaWall
          </h1>
        </RouterLink>
      </li>
      <li class="relative group">
        <RouterLink :to="`/main/space/${user._id}`">
          <div class="flex items-center">
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
                    <li
                      class="py-2 border-b-2 border-secondary hover:bg-gray-1"
                    >
                      我的貼文牆
                    </li>
                  </RouterLink>
                  <RouterLink to="/main/profile">
                    <li
                      class="py-2 border-b-2 border-secondary hover:bg-gray-1"
                    >
                      修改個人資料
                    </li>
                  </RouterLink>
                  <li @click="logOut" class="py-2 hover:bg-gray-1">登出</li>
                </ul>
              </div>
            </div>
          </div>
        </RouterLink>
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
      user: {
        avatar:'https://i.imgur.com/K3dyy79.png',
      },
    };
  },
  inject: ['emitter'],
  methods: {
    getProfile() {
      this.isLoading = true;
      const token = localStorage.getItem('accessToken');
      let url = `${import.meta.env.VITE_BASE_API}/users/profile`;
      this.axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.isLoading = false;
          this.user = res.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    logOut(){
      localStorage.setItem('accessToken','');
      this.$router.push('/');
    },
  },
  mounted() {
    const token = localStorage.getItem('accessToken');
    const _id = localStorage.getItem('userID');
    const name = localStorage.getItem('userName');
    const avatar = localStorage.getItem('userAvatar');
    const role = localStorage.getItem('userRole');
    this.user = { token, _id, name, role, avatar };
    // this.getProfile();
    // console.log(_id)
  },
};
</script>
