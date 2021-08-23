import { MockMethod } from 'vite-plugin-mock';
const users = [
  {
    userId: 'admin',
    token: 'admin',
    avatar: '/src/assets/images/logo.png',
  },
];
export default [
  {
    url: `/api/auth/qrLogin`,
    method: 'post',
    response: ({ body }) => {
      const user = users.find((user) => {
        return body.code === user.userId;
      });
      if (user) {
        return {
          code: 200,
          result: user.token,
        };
      } else {
        return {
          code: 401,
          msg: '登录信息有误',
        };
      }
    },
  },
] as MockMethod[];
