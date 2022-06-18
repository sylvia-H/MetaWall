<template>
  <div class="min-h-screen w-screen bg-gray-1 lg:bg-grid lg:flex">
    <div
      id="indexPlatform"
      class="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:gap-12 p-8 sm:px-12 sm:py-18 border-0 lg:border-2 border-solid border-secondary bg-gray-1 m-auto"
    >
      <div class="hidden sm:block">
        <img
          class="h-full w-full"
          src="../assets/login_img.svg"
          alt="MetaWall image"
        />
      </div>
      <div class="flex flex-col justify-center items-center">
        <h1 class="font-paytone-one text-5xl md:text-6xl text-primary mb-2">
          MetaWall
        </h1>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { userStore } from '@/stores';

export default {
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['updateUser']),
    check(token) {
      const url = `${import.meta.env.VITE_BASE_API}/check`;
      this.axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.updateUser(res.data.data);
          // const { _id, name, avatar, role, sex } = res.data.data;
          // localStorage.setItem('userID', _id);
          // localStorage.setItem('userName', name);
          // localStorage.setItem('userAvatar', avatar);
          // localStorage.setItem('userRole', role);
          // localStorage.setItem('userSex', sex);
          this.$router.push('/main');
        })
        .catch((err) => {
          // localStorage.setItem('accessToken', '');
          this.user = {};
          this.$router.push('/');
          console.dir(err);
        });
    },
  },
  mounted() {
    let AUTH_TOKEN;
    if (document.cookie.split(`; AUTH_TOKEN=`).length === 2) {
      AUTH_TOKEN = document.cookie
        .split(`; AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
      if (AUTH_TOKEN) {
        this.check(AUTH_TOKEN);
      }
    } else {
      this.$router.push('/');
    }
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   this.check(token);
    // }
  },
};
</script>

<style lang="scss">
#indexPlatform {
  @media (min-width: 1024px) {
    position: relative;
    height: 535px;
    width: 869px;
    box-shadow: -8px 8px 0 0 #00040029;
  }
}
</style>
