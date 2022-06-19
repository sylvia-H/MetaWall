<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay.vue';
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/userStore';

export default {
  components: {
    VueLoader,
  },
  data() {
    return {
      isLoading: false,
    };
  },
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
          this.$router.push({ name: 'main' });
        })
        .catch((err) => {
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
      router.push({ name: 'signup' });
    }
  },
};
</script>
