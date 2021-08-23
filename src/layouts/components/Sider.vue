<template>
  <el-menu
    class="menu"
    background-color="#001529"
    text-color="#fff"
    :collapse="collapsed"
    :default-active="activePath"
    router
    unique-opened
  >
    <div class="menu-logo" style="width: 205px">
      <img :src="logoUrl" alt="" height="30" />
      <span v-if="!collapsed">一日三饭</span>
    </div>

    <el-submenu v-for="item in menus" :key="item.path" :index="item.path">
      <template #title>
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </template>
      <template v-if="item.children">
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          {{ child.name }}
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import logoUrl from '@/assets/images/logo.png';

  export default defineComponent({
    props: {
      menus: {
        type: Array as PropType<MenuItem[]>,
        required: true,
      },
      collapsed: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const route = useRoute();
      const activePath = computed(() => route.path);
      return { activePath, logoUrl };
    },
  });
</script>

<style lang="scss" scoped>
  .menu {
    height: 100vh;
    &:not(.el-menu--collapse) {
      width: 205px;
    }
    &-logo {
      padding: 0 22px;
      height: 48px;
      color: #fff;
      display: flex;
      align-items: center;
      span {
        padding-left: 10px;
        font-size: 20px;
      }
    }
  }
</style>
