<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay.vue';
import { mapState, mapActions } from 'pinia';
import { userStore, statusStore } from '@/stores';

export default {
  components: {
    VueLoader,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(statusStore, ['isLoading']),
  },
  methods: {
    ...mapActions(userStore, ['updateUser']),
    check(token) {
      this.isLoading = true;
      const url = `${import.meta.env.VITE_BASE_API}/check`;
      this.axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.isLoading = false;
          document.cookie = `AUTH_TOKEN=${token}`;
          this.updateUser(res.data.data);
          this.$router.push({ name: 'main' });
        })
        .catch((err) => {
          this.isLoading = false;
          this.updateUser({});
          this.$router.push('/');
          console.dir(err);
        });
    },
  },
  mounted() {
    if (this.$route.query.token) {
      this.check(this.$route.query.token);
    } else {
      this.$router.push({ name: 'signup' });
    }
  },
};
</script>
