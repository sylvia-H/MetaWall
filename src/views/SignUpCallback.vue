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
          this.updateUser(res.data.data);
          this.$router.push({ name: 'main' });
        })
        .catch((err) => {
          this.isLoading = false;
          this.updateUser({});
          // this.$router.push('/');
          console.dir(err);
        });
    },
  },
  mounted() {
    if (this.$route.query.token) {
      this.check(this.$route.query.token);
      console.log(this.$route.query);
      console.log(this.$route.query.token);
    } else {
      router.push({ name: 'signup' });
    }
  },
};
</script>
