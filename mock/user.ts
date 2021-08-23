import { MockMethod } from 'vite-plugin-mock';
const users = [
  {
    id: 1,
    userId: 'admin',
    name: 'admin',
    alias: 'admin',
    mobile: '13000000000',
    email: 'admin@admin.com',
    status: '1',
    avatar: '/src/assets/images/logo.png',
    token: 'admin',
  },
];
export default [
  {
    url: `/api/user/info`,
    method: 'get',
    response: ({ headers }) => {
      const user = users.find((user) => {
        return headers.token === user.token;
      });
      if (user) {
        return {
          code: 200,
          result: {
            userId: user.userId,
            avatar: user.avatar,
          },
        };
      } else {
        return {
          code: 401,
          msg: '用户信息有误',
        };
      }
    },
  },
  {
    url: `/api/user/list`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        result: { items: users, total: users.length },
      };
    },
  },
] as MockMethod[];
