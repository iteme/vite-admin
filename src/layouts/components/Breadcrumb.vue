<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item">
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import { useRoute } from 'vue-router';

  let { menus } = defineProps({
    menus: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
  });

  let route = useRoute();

  const breadcrumbs = computed(() => {
    const path = route.path;

    for (const item of menus) {
      if (item.path === path) {
        return [item.name];
      } else if (item.children) {
        const arr = [item.name];
        for (const child of item.children) {
          if (child.path === path) {
            arr.push(child.name);
            return arr;
          }
        }
      }
    }
    return [];
  });
</script>
