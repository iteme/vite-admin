<template>
  <div class="container"> </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import { useAuthStore } from '@/store/modules/auth';
  import { getQrUrl, authQrLogin } from '@/api/auth';

  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const authStore = useAuthStore();
      onMounted(async () => {
        const code = route.query.code as string;

        if (code) {
          const res = await authQrLogin({ code });
          if (res?.data.success) {
            authStore.setToken(res.data.result as string);
            router.push('/');
          }
        } else {
          const res = await getQrUrl();
          if (res?.data.success) {
            const qrUrl = res.data.result as string;
            window.location.href = qrUrl;
          }
        }
      });
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(to right, #16222a, #3a6073);
  }

  .al-card {
    width: 400px;
    height: 350px;
    padding: 50px;
    background-color: #ffffff22;
    border-radius: 10px;
    .al-card-title {
      color: #fff;
      font-size: 25px;
    }
    .al-card-item {
      margin: 20px;
    }
  }
</style>
