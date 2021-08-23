import { defineStore } from 'pinia';
import { setTokenCache, getTokenCache } from '@/utils/storage';

interface UserInfo {
  userId: string;
  name: string;
  alias: string;
  mobile: string;
  email: string;
  avatar: string;
  role: string[];
  status: number;
}

interface AuthState {
  userInfo: UserInfo;
  token?: string;
}

const initUserInfo = {} as UserInfo;

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    userInfo: initUserInfo,
    token: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo;
    },
    getToken(): string | undefined {
      return this.token || getTokenCache();
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      setTokenCache(token);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },
    resetState() {
      this.userInfo = initUserInfo;
      this.token = undefined;
    },
  },
});
