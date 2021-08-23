import { MockMethod } from 'vite-plugin-mock';
const dictList = [
  {
    id: 1,
    parent: 'root',
    code: 'userStatus',
    nameCn: '用户状态',
    nameEn: 'User Status',
  },
  {
    id: 28,
    parent: 'userStatus',
    code: '1',
    nameCn: '在职',
    nameEn: 'Active',
  },
  {
    id: 29,
    parent: 'userStatus',
    code: '2',
    nameCn: '已禁用',
    nameEn: 'Disable',
  },
  {
    id: 30,
    parent: 'userStatus',
    code: '4',
    nameCn: '未激活',
    nameEn: 'Inactive',
  },
  {
    id: 31,
    parent: 'userStatus',
    code: '5',
    nameCn: '离职',
    nameEn: 'Dismiss',
  },
  {
    id: 2,
    parent: 'root',
    code: 'gender',
    nameCn: '性别',
    nameEn: 'Gender',
  },
  {
    id: 22,
    parent: 'gender',
    code: 'male',
    nameCn: '男',
    nameEn: 'Male',
  },
  {
    id: 23,
    parent: 'gender',
    code: 'female',
    nameCn: '女',
    nameEn: 'Female',
  },
];
export default [
  {
    url: `/api/dict/all`,
    method: 'get',
    response: () => {
      const dictObj = {};
      dictList
        .filter((dict) => dict.parent !== 'root')
        .forEach((dict) => {
          const arr = dictObj[dict.parent] || [];
          arr.push(dict);
          dictObj[dict.parent] = arr;
        });

      return {
        code: 200,
        result: dictObj,
      };
    },
  },
  {
    url: `/api/dict/list`,
    method: 'post',
    response: () => {
      const dicts = dictList.filter((dict) => dict.parent === 'root');
      return {
        code: 200,
        result: {
          items: dicts,
          total: dicts.length,
        },
      };
    },
  },
  {
    url: RegExp('/api/dict/child' + '.*'),
    method: 'get',
    response: ({ url }) => {
      const code = url.slice(url.lastIndexOf('/') + 1);
      console.error(code);

      return {
        code: 200,
        result: dictList.filter((dict) => dict.parent === code),
      };
    },
  },
] as MockMethod[];
