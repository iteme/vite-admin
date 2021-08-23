<template>
  <el-container class="layout">
    <el-config-provider :locale="locale">
      <Sider :menus="menus" :collapsed="collapsed" />
      <el-container>
        <el-header class="layout-header">
          <i v-show="!collapsed" class="el-icon-s-fold" @click="collapsed = !collapsed"></i>
          <i v-show="collapsed" class="el-icon-s-unfold" @click="collapsed = !collapsed"></i>
          <Breadcrumb :menus="menus" style="margin-left: 20px" />
          <Avatar class="layout-header-avatar" />
        </el-header>
        <Tab :menus="menus" />
        <el-main class="layout-main">
          <router-view />
        </el-main>
      </el-container>
    </el-config-provider>
  </el-container>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import locale from 'element-plus/lib/locale/lang/zh-cn';

  import Avatar from './components/Avatar.vue';
  import Sider from './components/Sider.vue';
  import Breadcrumb from './components/Breadcrumb.vue';
  import Tab from './components/Tab.vue';

  import { queryMenus } from '@/api/menu';
  import { getUserInfo } from '@/api/user';
  import { useAuthStore } from '@/store/modules/auth';
  import { useDictStore } from '@/store/modules/dict';

  const menus = queryMenus();
  const collapsed = ref(false);

  onMounted(async () => {
    const res = await getUserInfo();
    if (res?.data.success) {
      useAuthStore().setUserInfo(res.data.result);
    } else {
      useRouter().push('/auth/login');
    }
    useDictStore().initDict();
  });
</script>

<style lang="scss" scoped>
  .layout {
    background-color: #f0f2f5;

    &-header {
      display: flex;
      align-items: center;
      height: 60px;
      font-size: 24px;
      background-color: #fff;
      z-index: 999;

      &-avatar {
        margin-left: auto;
        line-height: 60px;
      }
    }

    &-main {
      margin: 24px 16px;
      background-color: #fff;
    }
  }
</style>
