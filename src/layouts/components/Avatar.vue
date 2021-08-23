<template>
  <div class="avatar">
    <el-dropdown class="avatar-dropdown" @command="handleCommand">
      <span>
        <img :src="userInfo.avatar" alt="" width="40" style="border-radius: 50%" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/modules/auth';
  const authStore = useAuthStore();
  const userInfo = computed(() => authStore.getUserInfo);

  function handleCommand(command: string) {
    if (command === 'logout') {
      authStore.setToken('');
      useRouter().push('/auth/login');
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    height: 40px;
    width: 40px;

    border-radius: 50%;
    cursor: pointer;
    color: #000;

    &-dropdown {
      height: 100%;
    }
  }
</style>
