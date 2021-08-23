<template>
  <div class="container">
    <div class="container-table">
      <TreeTable :data="records" v-model:query="query" @query-data="queryRecords" @load="loadChild">
        <el-table-column prop="code" label="字典编码"> </el-table-column>
        <el-table-column prop="nameCn" label="中文描述"> </el-table-column>
        <el-table-column prop="nameEn" label="英文描述"> </el-table-column>
      </TreeTable>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import TreeTable from '@/components/table/TreeTable.vue';
  import { listDict, childDict } from '@/api/dict';

  export default defineComponent({
    components: { TreeTable },
    setup() {
      const initQuery = {
        page: 1,
        pageSize: 10,
        total: 0,
      };
      const dataMap = reactive({
        records: [],
        query: { ...initQuery },
        addVisible: false,
        async queryRecords() {
          const res = await listDict(dataMap.query);
          if (res?.data.success) {
            const { items, total } = res.data.result;
            items.forEach((item: any) => (item.hasChildren = true));
            dataMap.records = items;
            dataMap.query.total = total;
          }
        },
        async loadChild(tree: any, _treeNode: any, resolve: any) {
          const res = await childDict(tree.code);
          if (res?.data.success) {
            resolve(res.data.result);
          } else {
            resolve([]);
          }
        },
        refresh() {
          dataMap.addVisible = false;
          dataMap.query = { ...initQuery };
          dataMap.queryRecords();
        },
      });
      onMounted(() => {
        dataMap.refresh();
      });

      return {
        ...toRefs(dataMap),
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
      margin: 0 30px 20px 0;
    }
  }
</style>
