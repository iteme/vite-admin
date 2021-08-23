<template>
  <div class="container">
    <div class="container-table">
      <BaseTable :data="records" v-model:query="query" @query-data="queryRecords">
        <el-table-column fixed label="头像" min-width="60">
          <template #default="record">
            <img :src="record.row.avatar" alt="" style="height: 40px" />
          </template>
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" min-width="120"> </el-table-column>
        <el-table-column fixed prop="alias" label="别名" min-width="120"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" min-width="160"> </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="200"> </el-table-column>
        <el-table-column label="状态" min-width="80">
          <template #default="scope">
            {{ toNameCn(scope.row.status, userStatusList) }}
            <el-badge v-if="scope.row.canceled" value="已取消"> </el-badge>
          </template>
        </el-table-column>
      </BaseTable>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed, reactive, toRefs } from 'vue';
  import BaseTable from '@/components/table/BaseTable.vue';
  import { listUser } from '@/api/user';
  import { toNameCn } from '@/utils/dict';
  import { useDictStore } from '@/store/modules/dict';

  export default defineComponent({
    components: { BaseTable },
    setup() {
      const store = {
        userStatusList: computed(() => useDictStore().getUserStatus),
      };

      const initQuery = {
        page: 1,
        pageSize: 10,
        total: 0,
      };
      const dataMap = reactive({
        records: [],
        query: { ...initQuery },
        async queryRecords() {
          const res = await listUser(dataMap.query);
          if (res?.data.success) {
            const { items, total } = res.data.result;
            dataMap.records = items;
            dataMap.query.total = total;
          }
        },
        refresh() {
          dataMap.query = { ...initQuery };
          dataMap.queryRecords();
        },
      });
      onMounted(() => {
        dataMap.refresh();
      });

      return {
        ...toRefs(dataMap),
        ...toRefs(store),
        toNameCn,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;

    .bst-table {
      margin: 12px 0;
    }

    .bst-form-item {
      margin: 0 35px 20px 0;
    }
  }
</style>
