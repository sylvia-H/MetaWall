<template>
  <RouterView />
</template>

<script>
import emitter from './methods/mitt';

export default {
  provide() {
    return {
      emitter,
    };
  },
};
</script>
